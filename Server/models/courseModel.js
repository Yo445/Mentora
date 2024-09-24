import mongoose from 'mongoose';
import User from './userModel.js';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
        },
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    category: {
        type: String,
        required: true,
        enum: ['Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Blockchain', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Other'],
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    materials: [
        {
            title: { type: String, required: true },
            materialType: {
                type: String,
                enum: ['assignment', 'quiz', 'lecture', 'reading', 'other'],
                required: true
            },
            url: {
                type: String,
                // validate: /^https?:\/\//
            },
            fileType: {
                type: String,
                // enum: ['video', 'audio', 'pdf', 'image', 'zip', 'doc', 'other'],
            },
            fileSize: {
                type: Number,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
            comment: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });

courseSchema.index({ title: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ difficulty: 1 });
courseSchema.index({ instructor: 1 });

courseSchema.pre('save', function (next) {
    // get name of instructor by id
    User.findById(this.instructor.id, (err, user) => {
        if (err) {
            return next(err);
        }
        this.instructor.name = user.name;
    });
    
    this.updatedAt = Date.now();
    next();
});

courseSchema.virtual('studentCount').get(function () {
    return this.students.length;
});

const Course = mongoose.model('Course', courseSchema);

export default Course;