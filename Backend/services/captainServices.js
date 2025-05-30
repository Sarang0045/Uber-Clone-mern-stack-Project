const captainModel = require('../models/captainModel');

module.exports.createCaptain = async ({firstname , lastname , email , password , color , plate , vehicletype , capacity }) => {
    if (!firstname || !email || !password || !color || !plate || !vehicletype || !capacity) {
        throw new Error('All fields are required');
    }
    
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            type: vehicletype,
            capacity
        }
    });

    return captain;
}
