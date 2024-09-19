import 'dotenv/config';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => cb(err, user));
});

const randomPassword = () => {
    return Math.random().toString(36).slice(-8);
};

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
        },
        async (accessToken, refreshToken, profile, cb) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                if (!profile.emails && !profile.emails.length) {
                    return cb( new Error('Google profile email is required'));
                }
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: randomPassword(),
                });
            }

            cb(null, user);
        } catch (error) {
            console.error(error);
            cb(error, null);
        }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_REDIRECT_URI,
        profileFields: ['id', 'displayName', 'emails'],
        },
        async (accessToken, refreshToken, profile, cb) => {
        try {
            let user = await User.findOne({ facebookId: profile.id });

            if (!user) {
                if (!profile.emails || !profile.emails.length) {
                    return cb(new Error('Facebook profile email is required'));
                }
                user = await User.create({
                    facebookId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: randomPassword(),
                });
            }

            cb(null, user);
        } catch (error) {
            console.log(error);
            cb(error, null);
        }
        }
    )
);

export default passport;
