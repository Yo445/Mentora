import 'dotenv/config';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';
import Course from '../models/courseModel.js';
import Enrollment from '../models/enrollmentModel.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
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
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if(isMatch) {
            res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
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
// @route   POST /api/users/google-login
// @access  Public
const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// @desc    Authenticate user with Google OAuth & get token
// @route   POST /api/users/google-callback
// @access  Public
const googleLoginCallback = (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({ message: 'Google authentication failed' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role, token });
    })(req, res, next);
};

// @desc    Authenticate user with Facebook OAuth
// @route   POST /api/users/facebook-login
// @access  Public
// login by facebook email
const facebookLogin = passport.authenticate('facebook', { scope: ['email'] });

// @desc    Authenticate user with Facebook OAuth & get token
// @route   POST /api/users/facebook-callback
// @access  Public
const facebookLoginCallback = (req, res, next) => {
    passport.authenticate('facebook', { session: false }, (err, user) => {
        if (err) {
            console.log("-------------",err);
            return res.status(400).json({ message: 'Facebook authentication failed' });
        }

        if(!user){
            console.log("-------------",user);
            return res.status(400).json({ message: 'Facebook authentication user failed' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role, token });
    })(req, res, next);
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
        // console.log(decoded);
        // console.log(Date.now().valueOf() / 1000);

        const currentTime = Date.now().valueOf() / 1000;
        if (decoded.exp > currentTime) {
            return res.status(400).json({ message: 'Refresh token has not been expired.' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        const newToken = generateToken(user.id);

        res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role, token: newToken });
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
        let courses;
        // check if instructor return only courses but if user return only enrolled courses
        if (req.user.role === 'instructor') {
            courses = await Course.find({ user: req.user._id });
            if (!courses) {
                return res.status(404).json({ message: 'No courses found' });
            }

        } else {
            const enrollments = await Enrollment.find({ user: req.user._id });
            if (!enrollments) {
                return res.status(404).json({ message: 'No enrollments found' });
            }

            courses = await Course.find({ _id: { $in: enrollments.map(enrollment => enrollment.course) } });
            if (!courses) {
                return res.status(404).json({ message: 'No enrolled courses found' });
            }
        }
        res.status(200).json({ courses });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export { facebookLogin, facebookLoginCallback, getUserCourses, googleLogin, googleLoginCallback, loginUser, refreshToken, registerUser };
