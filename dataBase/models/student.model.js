import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Student name must be at least 3 characters long'],
        maxLength: [30, 'Student name must be at most 30 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be at least 8 characters long'],
        maxLength: [40, 'Password must be at most 40 characters long']
    },
    age: {
        type: Number,
        required: true,
        min: [10, 'Student must be at least 10 years old'],
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: [true, 'Phone number already exists'],
        trim: true
    },
    coursesEnrolled: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }
},{timestamps:true})

export const studentModel = mongoose.model('student',studentSchema)