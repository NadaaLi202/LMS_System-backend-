import mongoose from "mongoose";

const lessonSchema =  new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3,'Title must be at least 3 characters long'],
        maxLength: [40,'Title must be at most 40 characters long']
    },
    slug : {
        type : String,
        lowercase : true,
        required : true,
        unique:true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId, // courseId
        ref: 'course',
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: [20,'Content must be at least 20 characters long'],
        maxLength: [500,'Content must be at most 500 characters long']
    },
    order: {
        type: Number,
        required: true,
        min: [0,'Order of course must be at least 0']
    },
    count: {
        type: Number,
        required: true,
        default: 1
    },
    resources: {  // as a pdf
        type: String,
        trim: true,
    }

},{timestamps:true})

export const lessonModel = mongoose.model('lesson',lessonSchema)