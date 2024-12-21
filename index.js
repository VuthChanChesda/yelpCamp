const express = require('express');
const app = express();
const path = require('path');
const methodsOverride = require('method-override');
const CampGround = require('./model/campGroundSchema');
const {campgroundSchema , reviewSchema} = require('./schemas');
const Reviews = require('./model/reviews');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp');

const db = mongoose.connection;
db.on('error' , console.error.bind(console , 'connection error:'));
db.once('open' , () => {
    console.log('Database connected');
});

app.engine('ejs' , ejsMate);
app.use(methodsOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

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

app.get('/campground',catchAsync( async (req, res) => {
    // Fetch all campgrounds sorted by newest first
    const camp = await CampGround.find({}).sort({ _id: -1 });
    res.render('campground/index', { camp });
})); //show all camp


app.get('/campground/new' , async (req , res) => {
    res.render('campground/newCamp');
}); //page creates new camp

app.post('/campground' ,validateCampground, catchAsync( async (req , res) => {

    const camp = new CampGround(req.body.campground);
    await camp.save();
    res.redirect(`/campground/${camp.id}`)
})); // make new camp

app.put('/campground/:id',validateCampground, catchAsync(async(req , res) => {
    let {id} = req.params;
    const camp = await CampGround.findByIdAndUpdate(id , {...req.body.campground} , {new: true} );
    res.redirect(`/campground/${camp.id}`);
})); //update camp

app.delete('/campground/:id', catchAsync( async (req , res) => {
    let {id} = req.params;
    const camp = await CampGround.findByIdAndDelete(id);
    res.redirect('/campground');
}));// delete camp

app.post('/campground/:id/review',validateReviews,catchAsync( async (req,res) => {
    const campground = await CampGround.findById(req.params.id);
    const review = new Reviews(req.body.reviews);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    console.log(campground);
    res.redirect(`/campground/${campground._id}`);
}))

app.get('/campground/:id/edit',catchAsync( async (req , res) => {

    const {id} = req.params;
    const camp = await CampGround.findById(id);

    res.render('campground/edit', {camp});  
} )); // page for editing camp



app.get('/campground/:id' , catchAsync ( async (req , res,next) => {
    const {id} = req.params;
    let camp = await CampGround.findById(id).populate('reviews');
    res.render('campground/show' , {camp});
})); //page for details of the camp

app.all('*' ,(req, res, next)=> {
    next(new ExpressError('page not found', 404)); // hit the error handling next
})// if nothing match in all paths

// Error-handling middleware in Express
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'oh no something went wrong'; //defaults message if there is no erred message
    // Log error (optional, for debugging)
    console.error(err);

    res.status(statusCode).render('error' , {err});
});// if something goes wrong, it will make it way here and error that we throw also get here


app.listen(3000, () => {
    console.log('Serving on port 3000');
});