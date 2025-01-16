
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = function(passport) {
  const User = require('./model/user');
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://yelpcamp-qztl.onrender.com/campground/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          // Log in the existing user
          return done(null, existingUser);
        }
  
        // Store user information temporarily in the session
        const tempUser = {
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        };
        return done(null, tempUser);
      } catch (error) {
        return done(error, false);
      }
    }
  ));

};
