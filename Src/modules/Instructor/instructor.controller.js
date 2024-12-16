import { instructorModel } from "../../../dataBase/models/instructor.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";




const createInstructor = catchAsyncError(async(req,res,next) => {

    let foundInstructor = await instructorModel.findOne({email: req.body.email})
    if(foundInstructor) {
        return next(new AppError('Instructor already exist',401))
    }
    let instructor = new instructorModel(req.body)
    await instructor.save()
    res.status(200).json({message: "Instructor created successfully",instructor})
})

const getAllInstructors = catchAsyncError(async(req,res,next) => {
    
    let instructors = await instructorModel.find()
    res.status(200).json({message:"All Instructors fetched successfully", Result: instructors.length , instructors})
    if(!instructors) return next(new AppError('No instructor found',401))
})

const getInstructorById = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let instructor = await instructorModel.findById(id)
    if(!instructor){
        return next(new AppError('Instructor not found',404))
    }
    res.status(200).json({message: "Instructor fetched successfully",instructor})
})

const updatedInstructor = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let instructor = await instructorModel.findByIdAndUpdate(id,req.body,{new: true})
    if(!instructor) return next(new AppError('Instructor not found',401))
    res.status(200).json({message: "Instructor updated successfully",instructor})
})

const deletedInstructor = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let instructor = await instructorModel.findByIdAndDelete(id)
    if(!instructor) return next(new AppError('Instructor not found',401))
    res.status(200).json({message: "Instructor deleted successfully",instructor})
})
export {createInstructor,getAllInstructors,getInstructorById,updatedInstructor,deletedInstructor}