const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/rideController');
const authMiddleware = require('../middlewares/OuthMiddleware');


router.post('/create',
    authMiddleware.authenticateUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authenticateUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

router.post('/confirm-ride',
    authMiddleware.authenticateCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authenticateCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride ID'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authenticateCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)
// .
module.exports = router;