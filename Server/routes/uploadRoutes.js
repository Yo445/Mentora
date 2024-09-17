import express from 'express';
import multer from 'multer';
import { uploadFileToMinio } from '../controllers/uploadController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkInstructorMiddleware from '../middleware/checkInstructorMiddleware.js';

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.route('/').post(authMiddleware, checkInstructorMiddleware, upload.single('file'), uploadFileToMinio);

export default router;