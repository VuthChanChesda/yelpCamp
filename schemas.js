const joi = require('joi');
module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        // img: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
    }).required(), // required the whole thing
    deleteImages: joi.array()
});

module.exports.reviewSchema = joi.object({
    reviews: joi.object({
        body: joi.string().required(),
        rating: joi.number().required().min(1).max(5)
    }).required() // required the whole thing
});
