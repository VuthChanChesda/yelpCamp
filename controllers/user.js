const User = require('../model/user');

module.exports.renderRegister = (req,res)=>{
    res.render('user/register');
};

module.exports.renderLogin = (req,res)=>{
    res.render('user/login');
};

module.exports.register = async(req,res)=>{
    try{
        const { username, email, password, agree } = req.body;
        if (!agree) {
            req.flash('error', 'You must agree to the Terms of Service and Privacy Policy.');
            return res.redirect('/register');
        }
        const user = new User({ username, email, agreeToTerms: true });
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
   
};

module.exports.login = (req,res)=>{
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campground';
    delete req.session.returnTo; // Clear the returnTo session variable after using it
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res)=>{
    req.logout(function(err){
        if(err){
            req.flash('error', 'Error logging out');
            return res.redirect('/campground');
        }
    })
    req.flash('success', 'Goodbye!')
    res.redirect('/campground')
    
};

module.exports.createUserWithGoogle = async(req,res)=>{
    try {
        const { agree } = req.body;
        if (!agree) {
            req.flash('error', 'You must agree to the Terms of Service and Privacy Policy.');
            return res.redirect('/auth/google/terms');
        }
        const tempUser = req.user;
        const user = new User({
            email: tempUser.email,
            googleId: tempUser.googleId,
            name: tempUser.name,
            agreeToTerms: true
        });
        await user.save();
        req.login(user, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/auth/google/terms');
    }
};

