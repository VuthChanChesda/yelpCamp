const express = require('express');
const app = express();
const ExpressError = require('./utils/ExpressError');
const path = require('path');
const methodsOverride = require('method-override');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const campground =  require('./routes/campgrounds');
const reviews =  require('./routes/reviews');
const sessions =  require('express-session');
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
app.use('/campground', campground); // prefix campground
app.use('/campground/:id/reviews', reviews); // prefix campground


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