const captainModel = require("../models/captainModel");
const { validationResult } = require("express-validator");
const captainService = require("../services/captainServices");
const blackListTokenModel = require("../models/blackListTokenModel");

module.exports.registerCaptain = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname , email, password, vehicle} = req.body;
    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        vehicletype: vehicle.type,
        capacity: vehicle.capacity
    });

    const token = await captain.generateAuthToken();
    res.cookie('token', token)
    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain || !captain.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = await captain.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ captain, token });
    } catch (err) {
        next(err);
    }   
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await blackListTokenModel.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
}
