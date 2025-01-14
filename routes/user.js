const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const passport = require('passport');
const {storeReturnTo , validatePasswordStrength} = require('../middleware');
const user = require('../controllers/user');

router.route('/register')
    .get(user.renderRegister)
    .post(validatePasswordStrength,catchAsync(user.register)); //put a func into CatchAsync if something wrong it will catch it then call next to error handing middleware;

router.route('/login')
    .get(user.renderLogin)
    .post(storeReturnTo,
          passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
          user.login);
  
          
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
})); // use google strategy to authenticate user with google

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), (req, res) => {
  if (req.session.returnTo) {
      const redirectUrl = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(redirectUrl);
  } else {
      res.redirect('/campground');  //after authenticate user with google succesfully, redirect to campground page
  }
});
  
router.get('/logout', user.logout);

module.exports = router;