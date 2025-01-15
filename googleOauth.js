
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = function(passport) {
  const User = require('./model/user');
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {

      try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        if (existingUser) {
             // Log in the existing user
          return done(null, existingUser);
        }

         // Register a new user
        const newUser = new User({
            googleId: profile.id,
            name: profile.emails[0].value.split('@')[0], // Save the user's display name
            email: profile.emails[0].value,
            username: profile.displayName,// Generate a unique username based on email
        });
        
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }

    }
  ));

};
