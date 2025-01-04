const CampGround = require("../model/campGroundSchema");
const Reviews = require('../model/reviews');

module.exports.createReview = async (req,res) => {
    const campground = await CampGround.findById(req.params.id);
    const review = new Reviews(req.body.reviews);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'successfully add review!');
    res.redirect(`/campground/${campground._id}`);
};
module.exports.deleteReview = async (req, res)=>{
    const {id , reviewId} = req.params;
    await CampGround.findByIdAndUpdate(id , {$pull: {reviews: reviewId}}); //pull a review array that has that id out of the array
    await Reviews.findByIdAndDelete(reviewId);
    req.flash('success', 'successfully delete review!');
    res.redirect(`/campground/${id}`);
};
