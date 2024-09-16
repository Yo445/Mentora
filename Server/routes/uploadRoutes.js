import express from 'express';
import multer from 'multer';
import { uploadFileToS3 } from '../controllers/uploadController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkInstructorMiddleware from '../middleware/checkInstructorMiddleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
//     destination: function(req, file, callback) {
//         callback(null, 'uploads');
//     },
//     filename: function(req, file, callback) {
//         const ext = file.mimetype.split('/')[1];
//         const fileName = `${req.user.id}/${Date.now()}_${file.originalname}.${ext}`;
//         callback(null, fileName);
//     }
// });

const upload = multer({ storage });

router.route('/').post(authMiddleware, checkInstructorMiddleware, upload.single('file'), uploadFileToS3);

export default router;