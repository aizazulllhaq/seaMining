const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const { User } = require("../models/userModel");
const { createTokenForUser } = require("../utils/authenticationToken");

exports.passportConfiguration = () => {

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    passport.use(new GoogleStrategy({
        clientID: "832316432958-at09oo9fa24e73vvoe8hd3t8ag504v6t.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/auth/google/callback",
        passReqToCallback: true,
    },
        async function (request, accessToken, refreshToken, profile, done) {
            const user = await User.findOne({ googleId: profile.id });

            if (!user) {
                const { id, displayName, email, picture } = profile;
                const newUser = new User({ fullname: displayName, googleId: id, email, is_verify: true, profileImage: picture })
                newUser.password = "something";

                await newUser.save();
                return done(null, newUser)
            } else {
                return done(null, user)
            }
        }
    ))
}