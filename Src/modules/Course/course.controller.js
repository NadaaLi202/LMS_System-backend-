import { courseModel } from "../../../dataBase/models/course.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import slugify from "slugify"


const addCourse = catchAsyncError(async(req,res,next) => {


        const foundCourse = await courseModel.findOne({slug: slugify(req.body.name)})
        if(foundCourse) return next(new AppError('Course already exist',401))

        req.body.slug = slugify(req.body.name)
        req.body.courseImage = req.file.filename
        const course = new courseModel(req.body) 
        await course.save();
        if(!course){
            return next(new AppError('Course not added',400))
        }

       res.status(200).json({message: "Course added successfully",course})
})

const getAllCourses = catchAsyncError(async (req, res, next) => {

    let apiFeatures =  new ApiFeatures(courseModel.find(),req.query)
        .pagination()
        .fields()
        .searching()
        .sorting()
        .filtration()

        apiFeatures.mongooseQuery= apiFeatures.mongooseQuery.populate('instructor', { name: 1, email: 1, _id: 0 })
        .populate('student', { name: 1, email: 1, _id: 0 })

    let courses = await apiFeatures.mongooseQuery
    
    if (!courses || !courses.length) {
        return next(new AppError('No course found', 401));
    }

    res.status(200).json({message: "All Courses fetched successfully", Result: courses.length,page: apiFeatures.page,courses});
});


const getCourseById = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let course = await courseModel.findById(id)
    if(!course){
        return next(new AppError('Course not found',401))
    }
    res.status(200).json({message: "Course fetched successfully",course})
})

const updateCourse = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    if(req.body.name) req.body.slug = slugify(req.body.name)
    let course = await courseModel.findByIdAndUpdate(id,req.body,{new: true})
    if(!course) return next(new AppError('Course not found',401))
    res.status(200).json({message: "Course updated successfully",course})
})

const deletedCourse = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let course = await courseModel.findByIdAndDelete(id)
    if(!course) return next(new AppError('Course not found',401))
    res.status(200).json({message: "Course deleted successfully",course})
})
export {addCourse,getAllCourses,getCourseById,updateCourse,deletedCourse}