
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
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          return done(null, existingUser);
        }
        const name = profile.displayName || `${profile.name.givenName} ${profile.name.familyName}` || "No Name Given";
        const newUser = new User({
          name: name,
          email: profile.emails[0].value,
          agreeToTerms: true // google oauth user agree to terms of service and privacy policy by default
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }

    }
  ));

};
