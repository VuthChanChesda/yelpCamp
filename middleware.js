module.exports.isLogined = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; // we are not authenticated yet so we store the url we want to go to in the session
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo; //here we already have req.session.returnTo because we use isLogined before this middleware for login route(it mean we already try to login and fail)
    }
    next();
}

