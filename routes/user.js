const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');
const {storeReturnTo } = require('../middleware');


router.get('/register',(req,res)=>{
    res.render('user/register');
})
router.get('/login',(req,res)=>{
    res.render('user/login');
});

//put a func into CatchAsync if something wrong it will catch it then call next to error handing middleware;
router.post('/register',catchAsync(async(req,res)=>{
    try{
        const {username,email, password} = req.body;
        const user = new User({username,email});
        const registerUser = await User.register(user,password); // register new user and hash password(add salt andy everything)
        req.login(registerUser, err => {
            if(err) return next(err);
            req.flash('success', 'User registered successfully.');
            res.redirect('/campground');
        }) //log the user in

    }catch(e){
        req.flash('error', e.message); //flash error message if there is an error
        res.redirect('/register'); 
    }
   
}));


router.post('/login', storeReturnTo , passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) ,(req,res)=>{
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campground';
    delete req.session.returnTo; // Clear the returnTo session variable after using it
    res.redirect(redirectUrl);
})

router.get('/logout',(req,res)=>{

    req.logout(function(err){
        if(err){
            req.flash('error', 'Error logging out');
            return res.redirect('/campground');
        }
    })
    req.flash('success', 'Goodbye!')
    res.redirect('/campground')
});

module.exports = router;