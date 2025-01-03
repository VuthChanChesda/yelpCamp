const express = require('express');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const CampGround = require("../model/campGroundSchema");
const {campgroundSchema} = require('../schemas');
const router = express.Router();
const mongoose = require('mongoose');
const {isLogined} = require('../middleware');


const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')//get all the msg from error detail array in line
        throw new ExpressError(msg, 400)
    } // validate data before we even post to db
    else {
        next()
    }
}

router.get('/',catchAsync( async (req, res) => {
    // Fetch all campgrounds sorted by newest first
    const camp = await CampGround.find({}).sort({ _id: -1 });
    res.render('campground/index', { camp });
})); //show all camp


router.get('/new' , isLogined ,async (req , res) => {
    res.render('campground/newCamp');
}); //page creates new camp

router.get('/:id/edit', isLogined ,catchAsync( async (req , res) => {

    const {id} = req.params;
    const camp = await CampGround.findById(id);
    if(!camp){
        req.flash('error','No camp found.');
        res.redirect('/campground'); //prevent render empty camp
    }
    res.render('campground/edit', {camp});
} ));

router.get('/:id' , catchAsync ( async (req , res,next) => {
    const {id} = req.params;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash('error', 'Invalid Campground ID.');
        return res.redirect('/campground'); // Redirect to some safe page
    }
    let camp = await CampGround.findById(id).populate('reviews');
    if(!camp){
        req.flash('error','No camp found.');
        res.redirect('/campground'); //prevent render empty camp
    }
    res.render('campground/show' , {camp});
})); //page for details of the camp

router.post('/' ,isLogined,validateCampground, catchAsync( async (req , res) => {
    const camp = new CampGround(req.body.campground);
    await camp.save();
    req.flash('success', 'successfully created!');
    res.redirect(`/campground/${camp.id}`)
})); // make new camp

router.put('/:id',validateCampground, catchAsync(async(req , res) => {
    let {id} = req.params;
    const camp = await CampGround.findByIdAndUpdate(id , {...req.body.campground} , {new: true} );
    req.flash('success', 'successfully updated!');
    res.redirect(`/campground/${camp.id}`);
})); //update camp

router.delete('/:id', catchAsync( async (req , res) => {
    let {id} = req.params;
    const camp = await CampGround.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted!');
    res.redirect('/campground');
}));// delete camp

module.exports = router;