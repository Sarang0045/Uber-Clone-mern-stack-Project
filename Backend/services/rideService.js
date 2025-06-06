const rideModel = require("../models/rideModel");
const mapService = require("./mapServices");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 50,
    car: 70,
    moto: 40,
  };

  const perKmRate = {
    auto: 20,
    car: 45,
    moto: 10,
  };

  const perMinuteRate = {
    auto: 4,
    car: 5,
    moto: 2,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return { fare, distanceTime };
}

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error(
      `All fields are required. Received: user=${user}, pickup=${pickup}, destination=${destination}, vehicleType=${vehicleType}`
    );
  }

  const { fare, distanceTime } = await getFare(pickup, destination);
  console.log("Fare calculated:", fare);

  const ride = await rideModel.create({
    user,
    pickup, // store as string
    destination, // store as string
    otp: getOtp(6),
    fare: fare[vehicleType],
    distance: distanceTime.distance.value,
    duration: distanceTime.duration.value,
  });
  console.log("Ride created:", ride);
  return ride;
};

module.exports.getFare = getFare;
