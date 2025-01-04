const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const passport = require('passport');
const {storeReturnTo } = require('../middleware');
const user = require('../controllers/user');

router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.register)); //put a func into CatchAsync if something wrong it will catch it then call next to error handing middleware;

router.route('/login')
    .get(user.renderLogin)
    .post(storeReturnTo,
          passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
          user.login);

router.get('/logout', user.logout);

module.exports = router;