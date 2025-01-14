const ExpressError = require('./utils/ExpressError');
const {campgroundSchema} = require('./schemas');
const CampGround = require("./model/campGroundSchema");
const {reviewSchema} = require('./schemas');
const Review = require('./model/reviews');
const {passwordStrength} = require('check-password-strength');



module.exports.isLogined = (req, res, next) => {
    if (!req.isAuthenticated() || !req.user) {
        req.session.returnTo = req.originalUrl; //store the url that user want to go to
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')//get all the msg from error detail array in line
        throw new ExpressError(msg, 400)
    } // validate data before we even post to db
    else {
        next()
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const camp = await CampGround.findById(id);
    if(!camp.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campground/${camp.id}`);
    }
    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    const {reviewId ,id} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campground/${id}`);
    }
    next();
};

module.exports.validateReviews = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')//get all the msg from error detail array in line
        throw new ExpressError(msg, 400)
    } // validate data before we even post to db
    else {
        next()
    }
}

// Password strength validation middleware
module.exports.validatePasswordStrength = (req, res, next) => {
    const { password } = req.body;
    const strength = passwordStrength(password);
    
    if (strength.id < 2) { // Requiring at least 'medium' strength
        req.flash('error', 'Password is too weak. Please use a stronger password.');
        return res.redirect('/register');
    }
    next();
  };

