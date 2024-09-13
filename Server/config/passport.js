import 'dotenv/config';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/userModel.js';


// Serialize user to store in session (if using session-based auth)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                if (!profile.emails && !profile.emails.length) {
                    return done( new Error('Google profile email is required'));
                    
                }
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });
            }

            done(null, user);
        } catch (error) {
            console.error(error);
            done(error, null);
        }
        }
    )
);

// Facebook OAuth Strategy
passport.use(
    new FacebookStrategy(
        {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'emails'],
        },
        async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ facebookId: profile.id });

            if (!user) {
                if (!profile.emails || !profile.emails.length) {
                    return done(new Error('Facebook profile email is required'));
                }
                user = await User.create({
                    facebookId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });
            }

            done(null, user);
        } catch (error) {
            done(error, null);
        }
        }
    )
);

export default passport;