const express = require('express');
const catchAsync = require('../utils/catchAsync');
const CampGround = require("../model/campGroundSchema");
const router = express.Router();
const mongoose = require('mongoose');
const {isLogined ,isAuthor ,validateCampground} = require('../middleware');


router.get('/',catchAsync( async (req, res) => {
    // Fetch all campgrounds sorted by newest first
    const camp = await CampGround.find({}).sort({ _id: -1 });
    res.render('campground/index', { camp });
})); //show all camp


router.get('/new' , isLogined ,async (req , res) => {
    res.render('campground/newCamp');
}); //page creates new camp

router.get('/:id/edit', isLogined ,isAuthor,catchAsync( async (req , res) => {  
    const {id} = req.params;
    const camp = await CampGround.findById(id);
    if(!camp){
        req.flash('error','No camp found.');
        res.redirect('/campground'); //prevent render empty camp
    }
 
    res.render('campground/edit', {camp});
} ));

router.get('/:id'  , catchAsync ( async (req , res,next) => {
    const {id} = req.params;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash('error', 'Invalid Campground ID.');
        return res.redirect('/campground'); // Redirect to some safe page
    }
    let camp = await CampGround.findById(id)
    .populate({path: 'reviews', populate: {path: 'author'}})
    .populate('author');
    
    if(!camp){
        req.flash('error','No camp found.');
        res.redirect('/campground'); //prevent render empty camp
    }
    res.render('campground/show' , {camp});
})); //page for details of the camp

router.post('/' ,isLogined,validateCampground, catchAsync( async (req , res) => {
    const camp = new CampGround(req.body.campground);
    camp.author = req.user._id; //add author to camp(we get user._id from passport when we login) it the same as user._id in our db

    await camp.save();
    req.flash('success', 'successfully created!');
    res.redirect(`/campground/${camp.id}`);
})); // make new camp

router.put('/:id',isLogined,isAuthor,validateCampground, catchAsync(async(req , res) =>{
    let {id} = req.params;
    const camp = await CampGround.findByIdAndUpdate(id , {...req.body.campground} , {new: true} );
    req.flash('success', 'successfully updated!');
    res.redirect(`/campground/${camp.id}`);
})); //update camp

router.delete('/:id',isLogined,isAuthor, catchAsync( async (req , res) => {
    let {id} = req.params;
    const camp = await CampGround.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted!');
    res.redirect('/campground');
}));// delete camp

module.exports = router; 
