const joi = require('joi');
module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        img: joi.string().required(),
        descriptors: joi.string().required(),
        location: joi.string().required(),
    }).required() // required the whole thing
})