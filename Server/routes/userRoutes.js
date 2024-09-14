import express from 'express';
import { facebookLogin, getUserCourses, googleLogin, loginUser, refreshToken, registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register')
            .post(registerUser);

router.route('/login')
            .post(loginUser);

router.route('/facebook-login')
            .post(facebookLogin);

router.route('/facebook-callback')
            .get(facebookLogin);

router.route('/google-login')
            .post(googleLogin);

router.route('google-callback')
            .get(googleLogin);

router.route('/refresh-token')
            .post(refreshToken);

router.route('/:id/courses')
            .get(authMiddleware, getUserCourses); //Get all courses created or enrolled in by a specific user

export default router;
