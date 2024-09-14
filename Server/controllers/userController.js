import 'dotenv/config';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Course from '../models/courseModel.js';
import Enrollment from '../models/enrollmentModel.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// import axios from 'axios';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.matchPassword(password);
        if(isMatch) {
            res.json({ id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Authenticate user with Google OAuth & get token
// @route   POST /api/users/login/google
// @access  Public
// login by email google
const googleLogin = async (req, res) => {
    // try
    // const response = await axios.post('/api/users/google-login');
    passport.authenticate('google', { session: false, scope: ['profile', 'email'] }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Google login failed',
                user: user,
                error: err || info,
            });
        }
        req.login(user, { session: false }, async (error) => {
            if (error) {
                res.send(error);
            }
            const token = generateToken(user._id);
            return res.json({ id: user._id, name: user.name, email: user.email, token });
        });
    })(req, res);
}

// @desc    Authenticate user with Facebook OAuth & get token
// @route   POST /api/users/login/facebook
// @access  Public
// login by facebook email
const facebookLogin = async (req, res) => {
    // try
    // const response = await axios.post('/api/users/facebook-login');
    passport.authenticate('facebook', { session: false, scope: ['email'] }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Facebook login failed',
                user: user,
                error: err || info,
            });
        }
        req.login(user, { session: false }, async (error) => {
            if (error) {
                res.send(error);
            }
            const token = generateToken(user._id);
            return res.json({ id: user._id, name: user.name, email: user.email, token });
        });
    })(req, res);
}

// @desc    Refresh user token
// @route   POST /api/users/refresh-token
// @access  Private
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(403).json({ message: 'Refresh Token is required!' });
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        console.log(decoded);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        const newToken = generateToken(user.id);

        res.json({ id: user._id, name: user.name, email: user.email, token: newToken });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get all courses created or enrolled in by a specific user
// @route   GET /api/users/:id/courses
// @access  Private
const getUserCourses = async (req, res) => {
    try {
        const courses = await Course.find({ user: req.params.id });
        const enrollments = await Enrollment.find({ user: req.params.id });
        const enrolledCourses = await Course.find({ _id: { $in: enrollments.map(enrollment => enrollment.course) } });
        res.status(200).json({ courses, enrolledCourses });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export { facebookLogin, getUserCourses, googleLogin, loginUser, refreshToken, registerUser };


// const getUserCourses = async (req, res) => {
//     try {
//         const courses = await Course.find({ $or: [{ creator: req.params.id }, { students: req.params.id }] });
//         res.json(courses);
//     }
//     catch(error) {
//         res.status(500).json({ message: error.message });
//     }
// }



// model for refresh token
// const mongoose = require("mongoose");
// const config = require("../config/auth.config");
// const { v4: uuidv4 } = require('uuid');

// const RefreshTokenSchema = new mongoose.Schema({
//   token: String,
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   expiryDate: Date,
// });

// RefreshTokenSchema.statics.createToken = async function (user) {
//   let expiredAt = new Date();

//   expiredAt.setSeconds(
//     expiredAt.getSeconds() + config.jwtRefreshExpiration
//   );

//   let _token = uuidv4();

//   let _object = new this({
//     token: _token,
//     user: user._id,
//     expiryDate: expiredAt.getTime(),
//   });

//   console.log(_object);

//   let refreshToken = await _object.save();

//   return refreshToken.token;
// };

// RefreshTokenSchema.statics.verifyExpiration = (token) => {
//   return token.expiryDate.getTime() < new Date().getTime();
// }

// const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

// module.exports = RefreshToken;