const userModel = require('../models/userModel');
const userServices = require('../services/userServices');
const { validationResult } = require('express-validator');


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