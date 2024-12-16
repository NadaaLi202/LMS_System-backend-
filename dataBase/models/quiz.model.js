import mongoose from "mongoose";

const quizSchema =  new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [3,'Title must be at least 3 characters long'],
        maxLength: [40,'Title must be at most 40 characters long']
    },
    course: {
        type: mongoose.Schema.Types.ObjectId, // courseId
        ref: 'course',
        required: true
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'lesson',
        required: true
    },
    questions: {
        type: String,
        enum: ['article','choose'],
        default: 'choose',
        required: true,
        trim: true,
    },
    answer: {
        type: String,
        trim: true,
        maxLength: [250, 'Description must be at most 250 characters long']
    },
    deadline: {
        type: Date,
        required: [true,'Deadline is required']
    },
    duration: {
        type: Number,
        required : true,
        min: [10, 'Duration must be at least 10 minute']
    },
    attempts: {
        type: Number,
        required:true,
        default: 0,
        max: [1, 'At most one attempt is accepted']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }

},{timestamps:true})

export const quizModel = mongoose.model('quiz',quizSchema )