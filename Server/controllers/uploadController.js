import { uploadToS3 } from '../config/s3.js';

const uploadFileToS3 = async (req, res) => {
    try {
        // const file = req.files.file;
        const file = req.file;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${req.user.id}/${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };
        const data = await uploadToS3(params);

        const course = await Course.findById(req.body.courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        course.materials.push({
            title: file.originalname,
            url: data.Location,
            fileType: file.mimetype.split('/')[0],
            fileSize: file.size,
        });

        await course.save();

        res.status(201).json({ url: data.Location });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to upload file to S3'});
    }
}

export { uploadFileToS3 };
