import express from 'express';
import { createCourse, deleteCourse, enrollCourse, getCourseById, getCourses, reviewCourse, updateCourse } from '../controllers/courseController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkInstructorMiddleware from '../middleware/checkInstructorMiddleware.js';
import checkStudentMiddleware from '../middleware/checkStudentMiddleware.js';

const router = express.Router();

router.route('/')
            .get(getCourses)
            .post(authMiddleware, checkInstructorMiddleware, createCourse); // (authenticated as an instructor)

router.route('/:id')
            .get(getCourseById)
            .put(authMiddleware, checkInstructorMiddleware, updateCourse) // Update course for only (authenticated and authorized as an instructor).
            .delete(authMiddleware, checkInstructorMiddleware, deleteCourse) // Delete course for only (authenticated and authorized as an instructor).

router.route('/:id/enroll')
            .post(authMiddleware, checkStudentMiddleware, enrollCourse) // (authenticated)

router.route('/:id/review')
            .post(authMiddleware, checkStudentMiddleware, reviewCourse) // (authenticated)

export default router;
