const { validationResult } = require("express-validator");
const rideService = require("../services/rideService"); // <-- fix filename
const mapService = require("../services/mapServices"); // <-- fix filename
const sendMessageToSocketId = require("../socket").sendMessageToSocketId;

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination, vehicleType } = req.body;
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
    const captainsInRadius = await mapService.getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      30
    );
    console.log("Captains in radius:", captainsInRadius);
    ride.otp = "";
    captainsInRadius.map(async (captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ride
      });
    });
    res.status(201).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
