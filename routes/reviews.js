const express = require('express');
const router = express.Router({mergeParams: true}); //so have access to param in index
const Reviews = require('../model/reviews');
const catchAsync = require('../utils/catchAsync');
const CampGround = require("../model/campGroundSchema");
const {validateReviews , isLogined , isReviewAuthor} = require('../middleware');

router.post('/',isLogined,validateReviews,catchAsync( async (req,res) => {
    const campground = await CampGround.findById(req.params.id);
    const review = new Reviews(req.body.reviews);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'successfully add review!');
    res.redirect(`/campground/${campground._id}`);
}))

router.delete('/:reviewId' ,isLogined,isReviewAuthor, catchAsync(async (req, res)=>{
    const {id , reviewId} = req.params;
    await CampGround.findByIdAndUpdate(id , {$pull: {reviews: reviewId}}); //pull a review array that has that id out of the array
    await Reviews.findByIdAndDelete(reviewId);
    req.flash('success', 'successfully delete review!');
    res.redirect(`/campground/${id}`);


}))

module.exports = router;