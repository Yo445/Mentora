import express from 'express';
import passport from 'passport';
import { facebookLogin, getUserCourses, loginUser, refreshToken, registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register')
            .post(registerUser);

router.route('/login')
            .post(loginUser);

router.route('/facebook-login')
            .post(passport.authenticate('facebook', { scope: ['email'] }));

router.route('/facebook-callback')
            .post(facebookLogin);

router.route('/google-login')
            .post(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('google-callback')
            .post(passport.authenticate('google', { session: false }), (req, res) => {
                const token = generateToken(req.user._id);
                res.json({ id: req.user._id, name: req.user.name, email: req.user.email, token });
            });
            // .post(googleLogin);

router.route('/refresh-token')
            .post(refreshToken);

router.route('/:id/courses')
            .get(authMiddleware, getUserCourses); //Get all courses created or enrolled in by a specific user

export default router;
