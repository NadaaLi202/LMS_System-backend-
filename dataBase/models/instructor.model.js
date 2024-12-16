import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Instructor name must be at least 3 characters long'],
        maxLength: [30, 'Instructor name must be at most 30 characters long']
    },
    age: {
        type: Number,
        required: true,
        min: [20, 'Instructor must be at least 20 years old'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum:{
           values: ['male', 'female'],
           message: 'Gender must be male or female'
        }
    },
    email : {
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
    bio: {
        type: String,
        trim: true,
        minLength: [3, 'Bio must be at least 3 characters long'],
        maxLength: [300, 'Bio must be at most 300 characters long']
    },
    country: {
        type: String,
        trim: true,
        minLength: [3, 'Country must be at least 3 characters long'],
        maxLength: [30, 'Country must be at most 30 characters long']
    },
    city: {
        type: String,
        trim: true,
        minLength: [3, 'City must be at most 3 characters long'],
        maxLength: [30, 'City must be at most 30 characters long']
    },
    phone: {
        type: String,
        trim: true,
        unique: [true, 'Phone number already exists'],
    },
    hisSpeciality: {
        type: String,
        required: true,
        minLength: [5,'His speciality must be at least 5 characters long'],
        maxLength: [30,'His speciality must be at most 30 characters long']
    },
},{timestamps: true});

export const instructorModel = mongoose.model('instructor',instructorSchema);