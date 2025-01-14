if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); //get data from .env file
}

const express = require('express');
const app = express();
const ExpressError = require('./utils/ExpressError');
const path = require('path');
const methodsOverride = require('method-override');
const ejsMate = require('ejs-mate')
const sessions =  require('express-session');
const flash = require('connect-flash');
const User = require('./model/user');
const passport = require('passport');//allow us to use multiple way to login
const LocalStrategy = require('passport-local');


const userRoutes = require('./routes/user');
const campgroundRoutes =  require('./routes/campgrounds');
const reviewsRoutes =  require('./routes/reviews');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp');
const db = mongoose.connection;
db.on('error' , console.error.bind(console , 'connection error:'));
db.once('open' , () => {
    console.log('Database connected');
    console.log('http://localhost:3000/campground');
});

app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

app.use(methodsOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));
const sessionCofig = {
    secret: "testSecret", // Secret to sign cookies (use env var in production)
    resave: false, // Prevents saving unchanged sessions
    saveUninitialized: true, // Saves new sessions even if not modified
    cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,//one week
            maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(sessions(sessionCofig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//tell passport to use LocalStrategy and authenticate on our user model

passport.serializeUser(User.serializeUser()); // tell passport how to store user in session
passport.deserializeUser(User.deserializeUser()); //how to get user out of the session


app.use((req,res,next) => {
    //if we have a user in current user(show logout in navbar)
    res.locals.currentUser = req.user; // Make 'currentUser' available in all templates
    res.locals.success = req.flash('success'); // Make 'success' flash message available in all templates
    res.locals.error = req.flash('error');
    next();
});



app.use('/campground', campgroundRoutes); // prefix campground
app.use('/campground/:id/reviews', reviewsRoutes); // prefix campground
app.use('/',userRoutes);

app.get('/' , (req, res) => {
    res.render('home');
}); //home page


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