const Basejoi = require('joi');
const sanitizeHtml = require('sanitize-html');


const extansion = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
});

const joi = Basejoi.extend(extansion);



module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required().escapeHTML(),
        price: joi.number().required().min(0),
        // img: joi.string().required(),
        description: joi.string().required().escapeHTML(),
        location: joi.string().required().escapeHTML(),
    }).required(), // required the whole thing
    deleteImages: joi.array()
});

module.exports.reviewSchema = joi.object({
    reviews: joi.object({
        body: joi.string().required().escapeHTML(),
        rating: joi.number().required().min(1).max(5)
    }).required() // required the whole thing
});


