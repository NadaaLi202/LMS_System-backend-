import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Course name already exists'],
        minLength: [3, 'Course name must be at least 3 characters long'],
        maxLength: [30, 'Course name must be at most 30 characters long']
    },
    slug : {
        type : String,
        lowercase : true,
        required : true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, 'Course description must be at least 10 characters long'],
        maxLength: [300, 'Course description must be at most 300 characters long']
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'instructor',
        required: true,
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    }],
    price: {
        type: Number,
        required: true,
        min: [0, 'Course price must be at least 0'],
    },
    duration: {
        type: String,
        required: true,
        minLength: [0, 'Course duration must be at least 0'],
        maxLength: [120, 'Course duration must be at most 120'],
    },
    status: {
        type: String,
        required: true,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    requiredSkillsOfThisCourse: {
        type: String,
        required: true,
        trim: true,
        minLength: [2,'Required skills must be at least 2 characters long'],
        maxLength: [200,'Required skills must be at most 200 characters long']
    },
    courseMaterials: {
        type: String,
        required: true,
        trim: true,
        minLength: [5,'Course materials must be at least 5 characters long'],
        maxLength: [100,'Course materials must be at most 100 characters long']
    },
    courseImage: {
        type: String,
        required: true
    },
    degreeOfThisCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        // required: true,
        min: [0, 'Degree of this course must be at least 0'],
        max: [100, 'Degree of this course must be at most 100'],
    }

},{timestamps: true});

export const courseModel = mongoose.model('course',courseSchema);