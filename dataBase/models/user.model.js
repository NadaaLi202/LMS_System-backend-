import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [30, 'Name must be at most 30 characters long']
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
        min: [10, 'User must be at least 10 years old'],
    },
    role:{
        type: String,
        enum: ['student', 'instructor','admin'],
        default: 'student'
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Address must be at least 3 characters long'],
        maxLength: [40, 'Address must be at most 40 characters long']
    },
    phone: {
        type: String,
        required: true,
        unique: [true, 'Phone number already exists'],
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    dateOfBirth: {
        type: Date
    },
    profileImage: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
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
    passwordChangedAt : Date,


},{timestamps:true})

// mongoose middleware

userSchema.pre('save',function(next) {
    if (!this.isModified('password')){
        return next();
    }
    this.password = bcrypt.hashSync(this.password,10);
    this.passwordChangedAt = Date.now();
    next();
})

userSchema.pre('findOneAndUpdate',function () {
    console.log(this._update.password)
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password,10)

})
export const userModel = mongoose.model('user',userSchema)