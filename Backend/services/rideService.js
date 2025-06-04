const Ride = require("../models/rideModel");
const mapService = require("./mapServices");
const crypto = require("crypto");

// Fare calculation constants
const FARE_CONFIG = {
  auto: { base: 30, perKm: 10, perMin: 2 },
  car: { base: 50, perKm: 15, perMin: 3 },
  moto: { base: 20, perKm: 8, perMin: 1.5 }
};

// Generate OTP
function generateOTP(length = 6) {
  return crypto.randomInt(10**(length-1), 10**length).toString();
}

// Validate coordinates
function isValidCoordinates(coords) {
  return (
    coords && 
    typeof coords.lat === 'number' && 
    typeof coords.lon === 'number' &&
    !isNaN(coords.lat) &&
    !isNaN(coords.lon)
  );
}

// Get coordinates for an address
async function getCoordinatesForAddress(address) {
  try {
    return await mapService.getAddressCoordinates(address);
  } catch (error) {
    throw new Error(`Failed to get coordinates for address: ${address}`);
  }
}

// Calculate fare based on distance and time
function calculateFare(vehicleType, distance, duration) {
  const config = FARE_CONFIG[vehicleType];
  if (!config) throw new Error(`Invalid vehicle type: ${vehicleType}`);
  
  return (
    config.base +
    (distance * config.perKm) +
    (duration * config.perMin)
  );
}

// Create a new ride
module.exports.createRide = async (user, pickup, destination, vehicleType) => {
  // Validate inputs
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  try {
    // Get coordinates for pickup and destination
    const [pickupCoords, destCoords] = await Promise.all([
      getCoordinatesForAddress(pickup),
      getCoordinatesForAddress(destination)
    ]);

    // Validate coordinates
    if (!isValidCoordinates(pickupCoords) || !isValidCoordinates(destCoords)) {
      throw new Error("Invalid coordinates for addresses");
    }

    // Get distance and time
    const distanceTime = await mapService.getDistanceTime(pickupCoords, destCoords);
    
    // Calculate fare
    const fare = calculateFare(
      vehicleType,
      distanceTime.distance.value, // in km
      distanceTime.duration.value  // in minutes
    );

    // Create ride document
    const ride = await Ride.create({
      user,
      vehicleType,
      otp: generateOTP(6),
      fare: Math.round(fare),
      pickup: {
        address: pickup,
        coordinates: pickupCoords
      },
      destination: {
        address: destination,
        coordinates: destCoords
      },
      distance: {
        value: distanceTime.distance.value,
        text: distanceTime.distance.text
      },
      duration: {
        value: distanceTime.duration.value,
        text: distanceTime.duration.text
      },
      status: "pending"
    });

    // Return ride with user id and ride id
    return {
      _id: ride._id,
      user: ride.user,
      vehicleType: ride.vehicleType,
      otp: ride.otp,
      fare: ride.fare,
      pickup: ride.pickup,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      status: ride.status
    };
  } catch (error) {
    console.error("Ride creation error:", error);
    throw new Error(`Failed to create ride: ${error.message}`);
  }
};

// Additional ride service functions can be added here