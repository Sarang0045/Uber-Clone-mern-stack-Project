const axios = require("axios");

module.exports.getAddressCoordinates = async (address) => {
  try {
    // Better address normalization
    const formattedAddress = address
      .trim()
      .replace(/\s+/g, " ") // Remove extra spaces
      .replace(/,/g, "") // Remove commas if present
      .replace(/(\D)(\d)/g, "$1 $2") // Add space between letter and number (C39 -> C 39)
      .replace(/(\d)(\D)/g, "$1 $2"); // Add space between number and letter

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: formattedAddress,
          format: "json",
          limit: 1,
          addressdetails: 1,
          countrycodes: "in", // Prioritize Indian results
        },
        headers: {
          "User-Agent": "Uber-Clone-App/1.0",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        display_name: response.data[0].display_name, // For debugging
      };
    } else {
      // Try again with broader search
      const fallbackResponse = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: address.split(" ").slice(-2).join(" "), // Last two words
            format: "json",
            limit: 1,
          },
          headers: {
            "User-Agent": "Uber-Clone-App/1.0",
          },
        }
      );

      if (fallbackResponse.data && fallbackResponse.data.length > 0) {
        const { lat, lon } = fallbackResponse.data[0];
        return {
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          display_name: fallbackResponse.data[0].display_name,
        };
      }

      throw new Error("No results found for the given address.");
    }
  } catch (error) {
    console.error(`Geocoding error for address: ${address}`, error);
    throw new Error(
      `Address not found: "${address}". Please try a more specific location.`
    );
  }
};

// OSRM-based distance/time calculation
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required.");
  }

  // Validate coordinates
  const isValidCoordinate = (coord) =>
    typeof coord.lat === "number" &&
    typeof coord.lon === "number" &&
    !isNaN(coord.lat) &&
    !isNaN(coord.lon);

  if (!isValidCoordinate(origin) || !isValidCoordinate(destination)) {
    throw new Error("Invalid coordinates provided");
  }

  try {
    // Build OSRM URL
    const coordsString = `${origin.lon},${origin.lat};${destination.lon},${destination.lat}`;
    const url = `http://router.project-osrm.org/route/v1/driving/${coordsString}`;

    const response = await axios.get(url, {
      params: {
        overview: "simplified",
        steps: "false",
        alternatives: "false",
        geometries: "geojson",
      },
      timeout: 8000,
    });

    if (
      response.data.code !== "Ok" ||
      !response.data.routes ||
      response.data.routes.length === 0
    ) {
      throw new Error("No route data found for the given coordinates.");
    }

    const route = response.data.routes[0];
    const distanceKm = route.distance / 1000;
    const durationMin = Math.round(route.duration / 60);

    return {
      distance: {
        text: distanceKm.toFixed(2) + " km",
        value: distanceKm, // numeric value in km
      },
      duration: {
        text: durationMin + " min", // always in minutes
        value: durationMin, // numeric value in min
      },
    };
  } catch (error) {
    console.error("Routing error:", {
      origin: `${origin.lat},${origin.lon}`,
      destination: `${destination.lat},${destination.lon}`,
      error: error.message,
    });

    if (error.message.includes("No route data")) {
      throw new Error("No driving route found between these locations");
    }

    throw new Error(`Routing service unavailable. Please try again later.`);
  }
};
// Add to existing mapServices.js
module.exports.autocompleteAddress = async (query) => {
  try {
    // Validate query
    if (!query || query.length < 3) {
      throw new Error("Query must be at least 3 characters");
    }

    // Get suggestions from Nominatim
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          addressdetails: 1,
          limit: 8,
          countrycodes: "in", // Prioritize India
          dedupe: 1, // Remove duplicates
          polygon: 0,
          extratags: 0,
          namedetails: 0,
        },
        headers: {
          "User-Agent": "Uber-Clone-App/1.0",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );

    // Format results
    return response.data
      .map((item) => ({
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        type: item.type,
        importance: item.importance,
        address: item.address,
      }))
      .sort((a, b) => b.importance - a.importance); // Sort by importance
  } catch (error) {
    throw new Error(`Autocomplete failed: ${error.message}`);
  }
};

// Add caching for better performance
const autocompleteCache = new Map();
module.exports.cachedAutocomplete = async (query) => {
  const cacheKey = query.toLowerCase().trim();

  if (autocompleteCache.has(cacheKey)) {
    return autocompleteCache.get(cacheKey);
  }

  const results = await this.autocompleteAddress(query);
  autocompleteCache.set(cacheKey, results);

  // Cache for 1 hour
  setTimeout(() => autocompleteCache.delete(cacheKey), 60 * 60 * 1000);

  return results;
};
