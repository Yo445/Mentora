import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
    progress: {
        type: Number, // percentage
        default: 0,
        min: 0,
        max: 100,
    },
    grade:[
        {
            type: Number,
            min: 0,
            max: 100,
        }
    ],
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;