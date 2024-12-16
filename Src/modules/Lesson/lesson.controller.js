import slugify from "slugify";
import { lessonModel } from "../../../dataBase/models/lesson.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";


const addLesson = catchAsyncError(async(req,res,next) => {

    let foundLesson = await lessonModel.findOne({slug:slugify (req.body.title)})
    if(foundLesson) return next(new AppError('This lesson is already found',401))
        
        req.body.slug = slugify(req.body.title)
        let lesson = new lessonModel(req.body)
        await lesson.save()
        res.status(200).json({message:"Lesson added successfully",lesson})

})

// const getAllLessonOfSpecialCourse = catchAsyncError(async(req,res,next) => {

//     if(!req.body.course) return next(new AppError('Course id is required',400))
//     const lessons= await lessonModel.find({course:req.body.course})
//     res.status(200).json({message:"All lessons of this course fetched successfully", Result:lessons.length ,lessons})
//     if(!lessons || lessons.length === 0) return next(new AppError('Those lessons of this course not found',404))
// })

const getAllLessonOfSpecialCourse = catchAsyncError(async(req,res,next) => {

        const courseId = req.params.courseId;
        if(!courseId) return next(new AppError('Course id is required',400))

    const lessons= await lessonModel.find({course : courseId}).populate('course',{name:1,_id:0})
    res.status(200).json({message:"All lessons of this course fetched successfully", Result:lessons.length ,lessons})
    if(!lessons || lessons.length === 0) return next(new AppError('Those lessons of this course not found',404))
})

const getLessonById = catchAsyncError(async(req,res,next) => {

    const {id} = req.params
    const lesson = await lessonModel.findById(id)
    if(!lesson)  return next(new AppError('This lesson not found',400))
    res.status(200).json({message:"lesson fetched successfully",lesson})

})

const updatedLesson = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    if(req.body.title) req.body.slug = slugify(req.body.title)
    let lesson = await lessonModel.findByIdAndUpdate(id,req.body,{new: true})
    if(!lesson)  return next(new AppError('This lesson not found',400))
    res.status(200).json({message:"lesson updated successfully",lesson})

})
const deletedLesson = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let lesson = await lessonModel.findByIdAndDelete(id)
    if(!lesson)  return next(new AppError('This lesson not found',400))
    res.status(200).json({message:"lesson deleted successfully",lesson})

})



export {addLesson,getAllLessonOfSpecialCourse,getLessonById,updatedLesson,deletedLesson}