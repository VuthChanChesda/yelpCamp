const express = require('express');
const router = express.Router({mergeParams: true}); //so have access to param in index
const {reviewSchema} = require('../schemas');
const Reviews = require('../model/reviews');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const CampGround = require("../model/campGroundSchema");

const validateReviews = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')//get all the msg from error detail array in line
        throw new ExpressError(msg, 400)
    } // validate data before we even post to db
    else {
        next()
    }
}

router.post('/',validateReviews,catchAsync( async (req,res) => {
    const campground = await CampGround.findById(req.params.id);
    const review = new Reviews(req.body.reviews);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campground/${campground._id}`);
}))

router.delete('/:reviewId' , catchAsync(async (req, res)=>{
    const {id , reviewId} = req.params;
    await CampGround.findByIdAndUpdate(id , {$pull: {reviews: reviewId}}); //pull a review array that has that id out of the array
    await Reviews.findByIdAndDelete(reviewId);
    res.redirect(`/campground/${id}`);

}))

module.exports = router;