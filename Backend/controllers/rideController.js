const rideService = require('../services/rideService');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Extract data from request
    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id; // Assuming user is attached by auth middleware

    // Create ride
    const ride = await rideService.createRide(
      userId,
      pickup,
      destination,
      vehicleType
    );

    // Return success response
    return res.status(201).json({
      message: "Ride created successfully",
      ride: {
        id: ride._id,
        user: ride.user,
        pickup: ride.pickup.address,
        destination: ride.destination.address,
        fare: ride.fare,
        otp: ride.otp, // Only include in development
        distance: ride.distance.text,
        duration: ride.duration.text,
        status: ride.status
      }
    });
  } catch (error) {
    console.error("Controller error:", error);
    
    // Handle specific errors
    if (error.message.includes("coordinates")) {
      return res.status(400).json({ 
        message: "Address validation failed",
        details: error.message 
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to create ride",
      details: error.message 
    });
  }
};

// Add other ride controller methods as needed