const express = require('express');
const router = express.Router({mergeParams: true}); //so have access to param in index
const catchAsync = require('../utils/catchAsync');
const {validateReviews , isLogined , isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/',isLogined,validateReviews,catchAsync(reviews.createReview)); //create review

router.delete('/:reviewId' ,isLogined,isReviewAuthor, catchAsync(reviews.deleteReview)); //delete review

module.exports = router;