import { lessonModel } from "../../../dataBase/models/lesson.model.js";
import { quizModel } from "../../../dataBase/models/quiz.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";



const addQuiz = catchAsyncError(async(req,res,next) => {

    const lessonId = req.body.lesson
    let foundLesson = await lessonModel.findById(lessonId)
    if(!foundLesson) {
        return next(new AppError('Lesson not found',404))
    }
    const quiz = new quizModel(req.body) 
    await quiz.save()
    res.status(200).json({message:"Quiz of this lesson added successfully",quiz})
})


const getAllQuizOfSpecialLesson = catchAsyncError(async(req,res,next) => {

    const lessonId = req.params.lessonId
    let foundLesson = await lessonModel.findById(lessonId)
    if(!foundLesson) {
        return next(new AppError('Lesson not found',404))
    }
    let quizzes = await quizModel.find({lesson:lessonId})
    if(!quizzes || quizzes.length === 0){
        return next(new AppError('Quizzes not found',404))
    }
    res.status(200).json({message:"Quizzes fetched successfully", Result:quizzes.length ,quizzes})
})

const getQuizById = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    const quiz = await quizModel.findById(id)
    if(!quiz) {
        return next(new AppError('Quiz not found',404))
    }
    res.status(200).json({message:"Quiz fetched successfully",quiz})
})

const updatedQuiz = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let quiz = await quizModel.findByIdAndUpdate(id,req.body,{new: true})
    if(!quiz) {
        return next(new AppError('Quiz not found',404))
    }
    res.status(200).json({message:"Quiz updated successfully",quiz})
})
const deletedQuiz = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let quiz = await quizModel.findByIdAndDelete(id)
    if(!quiz) {
        return next(new AppError('Quiz not found',404))
    }
    res.status(200).json({message:"Quiz deleted successfully",quiz})
})
export {addQuiz,getAllQuizOfSpecialLesson,getQuizById,updatedQuiz,deletedQuiz}