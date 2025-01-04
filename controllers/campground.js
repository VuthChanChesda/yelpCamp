const CampGround = require("../model/campGroundSchema");
const mongoose = require('mongoose');

module.exports.index =  async (req, res) => {
    // Fetch all campgrounds sorted by newest first
    const camp = await CampGround.find({}).sort({ _id: -1 });
    res.render('campground/index', { camp });
};

module.exports.renderNewForm = async (req , res) => {
    res.render('campground/newCamp');
};

module.exports.createCamp = async (req , res) => {
    const camp = new CampGround(req.body.campground);
    camp.author = req.user._id; //add author to camp(we get user._id from passport when we login) it the same as user._id in our db

    await camp.save();
    req.flash('success', 'successfully created!');
    res.redirect(`/campground/${camp.id}`);
};

module.exports.renderShowCamp = async (req , res,next) => {
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
};

module.exports.renderEditCamp = async (req , res) => {  
    const {id} = req.params;
    const camp = await CampGround.findById(id);
    if(!camp){
        req.flash('error','No camp found.');
        res.redirect('/campground'); //prevent render empty camp
    }
    res.render('campground/edit', {camp});
};

module.exports.updateCamp = async(req , res) =>{
    let {id} = req.params;
    const camp = await CampGround.findByIdAndUpdate(id , {...req.body.campground} , {new: true} );
    req.flash('success', 'successfully updated!');
    res.redirect(`/campground/${camp.id}`);
};

module.exports.deleteCamp = async (req , res) => {
    let {id} = req.params;
    const camp = await CampGround.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted!');
    res.redirect('/campground');
};