const mapServices = require("../services/mapServices");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const result = await mapServices.getAddressCoordinates(req.query.address);
    res.status(200).json(result);
  } catch (error) {
    console.error("[getCoordinates] Geocoding error details:", {
      address: req.query.address,
      error: error.message
    });
    
    if (error.message.includes("No results found")) {
      res.status(404).json({ 
        message: "Location not found",
        details: error.message
      });
    } else {
      res.status(500).json({ 
        message: "Geocoding service error",
        details: error.message
      });
    }
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { origin, destination } = req.query;
    
    // Log addresses for debugging
    console.log("[getDistanceTime] Routing request:", { origin, destination });
    
    // Get coordinates
    const [originCoords, destinationCoords] = await Promise.all([
      mapServices.getAddressCoordinates(origin),
      mapServices.getAddressCoordinates(destination)
    ]);
    
    console.log("[getDistanceTime] Resolved coordinates:", {
      origin: originCoords,
      destination: destinationCoords
    });
    
    // Get distance and time
    const result = await mapServices.getDistanceTime(
      originCoords,
      destinationCoords
    );
    
    res.status(200).json(result);
  } catch (error) {
    console.error("[getDistanceTime] Full routing error:", {
      origin: req.query.origin,
      destination: req.query.destination,
      error: error.message,
      stack: error.stack
    });
    
    if (error.message.includes("No route data found")) {
      res.status(404).json({ 
        message: "No driving route found between these locations",
        details: error.message
      });
    } else if (error.message.includes("No results found")) {
      res.status(404).json({ 
        message: "One of the locations could not be found",
        details: error.message
      });
    } else {
      res.status(500).json({ 
        message: "Routing service error",
        details: error.message
      });
    }
  }
};

module.exports.getSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { input } = req.query;
    
    if (!input || input.trim().length < 3) {
      return res.status(400).json({
        message: "Input must be at least 3 characters"
      });
    }
    
    const results = await mapServices.cachedAutocomplete(input);
    
    if (results.length === 0) {
      return res.status(404).json({
        message: "No suggestions found",
        suggestions: []
      });
    }
    
    res.status(200).json({
      message: `${results.length} suggestions found`,
      suggestions: results
    });
    
  } catch (error) {
    console.error("[getSuggestions] Suggestions error:", {
      input: req.query.input,
      error: error.message
    });
    
    res.status(500).json({
      message: "Suggestion service error",
      details: error.message
    });
  }
};