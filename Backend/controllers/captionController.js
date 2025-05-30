const captionModel = require("../models/captionModel");
const { validationResult } = require("express-validator");
const captionService = require("../services/captionServices");
const blackListTokenModel = require("../models/blackListTokenModel");

module.exports.registerCaption = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname , email, password, vehicle} = req.body;
    const iscaptionExists = await captionModel.findOne({ email });
    if (iscaptionExists) {
        return res.status(400).json({ message: "Caption already exists" });
    }
    const hashedPassword = await captionModel.hashPassword(password);

    const caption = await captionService.createCaption({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        vehicletype: vehicle.type,
        capacity: vehicle.capacity
    });

    const token = await caption.generateAuthToken();
    // Set the token in a cookie
    res.cookie('token', token)
    res.status(201).json({ token, caption });
}

module.exports.loginCaption = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const caption = await captionModel.findOne({ email }).select('+password');
        if (!caption || !caption.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isMatch = await caption.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = await caption.generateAuthToken();
        res.cookie('token', token); // Set the token in a cookie
        res.status(200).json({ caption, token });
    } catch (err) {
        next(err);
    }   
}

module.exports.getCaptionProfile = async (req, res, next) => {
    res.status(200).json({ caption: req.caption });
}

module.exports.logoutCaption = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Add the token to the blacklist
        await blackListTokenModel.create({ token });
        res.clearCookie('token'); // Clear the cookie
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
}