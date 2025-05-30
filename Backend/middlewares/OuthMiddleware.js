const userModel = require('../models/userModel');
const captainModel = require('../models/captainModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blackListTokenModel');

module.exports.authenticateUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const blacklistedToken = await BlackListToken.findOne({ token }); // Check if the token is blacklisted
    if (blacklistedToken){ // If the token is blacklisted, return unauthorized
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authenticateCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const blacklistedToken = await BlackListToken.findOne({ token }); // Check if the token is blacklisted
    if (blacklistedToken){ // If the token is blacklisted, return unauthorized
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.captain = captain;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}