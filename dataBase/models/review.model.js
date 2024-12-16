import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minLength: [10,'Comment must be at least 10 characters long'],
        maxLength: [150,'Comment must be at most 150 characters long']
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5']
    }
},{timestamps: true});

export const reviewModel = mongoose.model('review',reviewSchema);