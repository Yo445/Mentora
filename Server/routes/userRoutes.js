import express from 'express';
import { facebookLogin, facebookLoginCallback, getUserCourses, googleLogin, googleLoginCallback, loginUser, refreshToken, registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register')
            .post(registerUser);

router.route('/login')
            .post(loginUser);

router.route('/facebook-login')
            .get(facebookLogin);

router.route('/facebook-callback')
            .get(facebookLoginCallback);

router.route('/google-login')
            .get(googleLogin);

router.route('/google-callback')
            .get(googleLoginCallback);

router.route('/refresh-token')
            .post(refreshToken);

router.route('/courses')
            .get(authMiddleware, getUserCourses); //Get all courses created or enrolled in by a specific user

export default router;
