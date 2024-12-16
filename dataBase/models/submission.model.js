import mongoose from "mongoose";

const submissionSchema =  new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId, // studentId
        ref: 'student',
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId, // quizId
        ref: 'quiz',
        required: true
    },
    answers: {
        type: [Object],
        required: [true, 'Answers are required.']
    },
    feedback: {
        type: String,
        trim: true,
        minLength: [5, 'Feedback must be at least 5 characters long.'],
        maxLength: [200, 'Feedback must be at most 200 characters long.']
    },
    score:{
        type: Number,
        required: [true, 'Grade is required.'],
        min: [0, 'Grade cannot be less than 0.'],
    },
    submittedAt: {
        type:Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default:true
    }


},{timestamps:true})

export const submissionModel = mongoose.model('submission',submissionSchema)