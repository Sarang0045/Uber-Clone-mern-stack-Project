const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const captainController = require('../controllers/captainController');
const captainModel = require('../models/captainModel');
const OuthMiddleware = require('../middlewares/OuthMiddleware');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of car, bike, or auto'),
],captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

router.get('/profile', OuthMiddleware.authenticateCaptain, captainController.getCaptainProfile);

router.get('/logout',OuthMiddleware.authenticateCaptain,captainController.logoutCaptain);


module.exports = router;