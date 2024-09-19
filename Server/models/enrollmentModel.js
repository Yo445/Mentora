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
    grade: [
        {
            materialId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course.materials',
            },
            type: {
                type: String,
                enum: ['quiz', 'assignment'],
                required: true,
            },
            score: {
                type: Number,
                min: 0,
                max: 100,
                required: true,
            }
        }
    ],
    completedMaterials: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course.materials',
        }
    ],
    completedAt: {
        type: Date,
    },
}, { timestamps: true });

enrollmentSchema.pre('save', async function (next) {
    try {
        const enrollment = this;
        const course = await Course.findById(enrollment.courseId);
        if (!course) {
            return next(new Error('Course not found'));
        }

        const totalMaterials = course.materials.length;
        const completedMaterials = enrollment.completedMaterials.length;

        enrollment.progress = Math.round((completedMaterials / totalMaterials) * 100);

        if (completedMaterials === totalMaterials) {
            enrollment.completedAt = Date.now();
        }

        if (enrollment.grade.length === 0) {
            enrollment.grade = course.materials
                .filter(material => ['quiz', 'assignment'].includes(material.materialType))
                .map(material => ({
                    materialId: material._id,
                    type: material.materialType,
                    score: 0
                }));
        }

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;