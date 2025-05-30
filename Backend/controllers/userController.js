const userModel = require('../models/userModel');
const userServices = require('../services/userServices');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blackListTokenModel');

module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Extract fullname from req.body
    const { fullname, email, password } = req.body;
    if (!fullname || !fullname.firstname) {
        return res.status(400).json({ error: "fullname.firstname is required" });
    }
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await userModel.hashPassword(password);
    const user = await userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashPassword
    });

    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        // Ensure we do NOT use .lean() here, so we get a Mongoose document with methods
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        // comparePassword should be defined in your user schema methods
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = await user.generateAuthToken();
        res.cookie('token', token); // Set the token in a cookie

        res.status(200).json({ user, token });
    } catch (err) {
        next(err);
    }   
}

module.exports.getProfile = async (req, res, next) => {
    res.status(200).json(req.user);
    // req.user is set by the authenticateUser middleware
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token'); // Clear the token cookie
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await BlackListToken.create({ token }); // Store the token in the blacklist
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
}