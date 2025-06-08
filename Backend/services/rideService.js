const rideModel = require("../models/rideModel");
const mapService = require("./mapServices");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // Geocode addresses to coordinates
  const pickupCoords = await mapService.getAddressCoordinates(pickup);
  const destinationCoords = await mapService.getAddressCoordinates(destination);

  if (
    !pickupCoords ||
    typeof pickupCoords.lat !== "number" ||
    typeof pickupCoords.lon !== "number" ||
    !destinationCoords ||
    typeof destinationCoords.lat !== "number" ||
    typeof destinationCoords.lon !== "number"
  ) {
    throw new Error("Invalid coordinates provided");
  }

  const distanceTime = await mapService.getDistanceTime(
    pickupCoords,
    destinationCoords
  );

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

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}

module.exports.getFare = getFare;
