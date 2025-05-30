const captionModel = require('../models/captionModel');

module.exports.createCaption = async ({firstname , lastname , email , password , color , plate , vehicletype , capacity }) => {
    if (!firstname || !email || !password || !color || !plate || !vehicletype || !capacity) {
        throw new Error('All fields are required');
    }
    
    const caption = await captionModel.create({
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

    return caption;
}