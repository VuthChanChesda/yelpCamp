const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const {isLogined ,isAuthor ,validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campground');

router.route('/')
    .get(catchAsync(campgrounds.index)) //show all camp
    .post(isLogined,validateCampground, catchAsync(campgrounds.createCamp )); // make new camp

router.get('/new' , isLogined, campgrounds.renderNewForm); //page creates new camp

router.route('/:id')
    .get(catchAsync(campgrounds.renderShowCamp)) //page for details of the camp
    .put(isLogined,isAuthor,validateCampground, catchAsync(campgrounds.updateCamp)) //update camp
    .delete(isLogined,isAuthor, catchAsync(campgrounds.deleteCamp));// delete camp

router.get('/:id/edit', isLogined ,isAuthor,catchAsync(campgrounds.renderEditCamp)); //page for edit camp

module.exports = router; 
