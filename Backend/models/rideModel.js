const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Captain',
  },
  pickup: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true }
    }
  },
  destination: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true }
    }
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
  },
  duration: {
    value: { type: Number }, // in minutes
    text: { type: String }   // human-readable
  },
  distance: {
    value: { type: Number }, // in km
    text: { type: String }   // human-readable
  },
  vehicleType: {
    type: String,
    enum: ['auto', 'car', 'moto'],
    required: true
  },
  paymentID: String,
  orderId: String,
  signature: String,
  otp: {
    type: String,
    select: false,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ride', rideSchema);