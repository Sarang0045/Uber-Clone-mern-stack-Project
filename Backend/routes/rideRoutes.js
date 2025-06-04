const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controllers/rideController');
const authenticateUser = require('../middlewares/OuthMiddleware');

// Ride creation endpoint
router.post(
  '/create',
  authenticateUser.authenticateUser,
  [
    body('pickup')
      .trim()
      .isString()
      .isLength({ min: 5 })
      .withMessage('Pickup location must be at least 5 characters'),
    body('destination')
      .trim()
      .isString()
      .isLength({ min: 5 })
      .withMessage('Destination must be at least 5 characters'),
    body('vehicleType')
      .isIn(['auto', 'car', 'moto'])
      .withMessage('Invalid vehicle type')
  ],
  rideController.createRide
);

// Add other ride routes as needed

module.exports = router;