import { courseModel } from "../../../dataBase/models/course.model.js";
import { reviewModel } from "../../../dataBase/models/review.model.js";
import { studentModel } from "../../../dataBase/models/student.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";





const addReview = catchAsyncError(async(req,res,next) => {

    const courseId = req.body.course;
    const studentId = req.body.student;

    const foundStudent  = await studentModel.findById(studentId)
    const foundCourse  = await courseModel.findById(courseId)
    if(!foundCourse && !foundStudent){
        return next(new AppError('This student or course not found',404))
    }
    const isReview = await reviewModel.findOne({student:req.body.student,course:req.body.course})
    if (isReview) return next (new AppError('This student is already add review of this course',409))
    let review = new reviewModel(req.body) 
    await review.save()
    res.status(200).json({message:"Review of this student of this course added successfully",review})

})

const  getAllReviews = catchAsyncError(async(req,res,next) => {

    let reviews = await reviewModel.find()
    if(!reviews){
        return next(new AppError('Reviews not found',404))
    }
    res.status(200).json({message:"Reviews fetched successfully" ,Result: reviews.length , reviews})
})

const  getReviewById = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;

    let review = await reviewModel.findById(id).populate('student',{ name:1 }).populate('course',{name:1})
    if(!review){
        return next(new AppError('Review not found',404))
    }
    res.status(200).json({message:"Review fetched successfully" , review})
})

const  updatedReview = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let review = await reviewModel.findByIdAndUpdate(id,req.body,{new: true})
    if(!review){
        return next(new AppError('Review not found',404))
    }
    res.status(200).json({message:"Review updated successfully" , review})
})


const  deletedReview = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let review = await reviewModel.findByIdAndDelete(id)
    if(!review){
        return next(new AppError('Review not found',404))
    }
    res.status(200).json({message:"Review deleted successfully" , review})
})



export {addReview,getAllReviews,getReviewById,updatedReview,deletedReview}