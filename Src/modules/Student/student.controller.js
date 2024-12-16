import { studentModel } from "../../../dataBase/models/student.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";


const addStudent = catchAsyncError(async(req,res,next) => {

    const foundStudent = await studentModel.findOne({email:req.body.email})

    if(foundStudent) return next(new AppError('Student already exist',409))

   let student = new studentModel(req.body)
    await student.save()
    res.status(200).json({message: "Student added successfully",student})
  
})

const getAllStudents = catchAsyncError(async(req,res,next) => {

    let students = await studentModel.find()
    res.status(200).json({message:"All Students fetched successfully", Result: students.length , students})

    if(!students) return next(new AppError('No student found',401))
})

const getStudentById = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let student = await studentModel.findById(id)
    if(!student){
        return next(new AppError('Student not found',401))
    }
    res.status(200).json({message: "Student fetched successfully",student})
})

const updatedStudent = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let student = await studentModel.findByIdAndUpdate(id,req.body,{new: true})
    if(!student) return next(new AppError('Student not found',401))
    res.status(200).json({message: "Student updated successfully",student})
})

const deletedStudent = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let student = await studentModel.findByIdAndDelete(id)
    if(!student) return next(new AppError('Student not found',401))
    res.status(200).json({message: "Student deleted successfully",student})
})




export {addStudent,getAllStudents,getStudentById,updatedStudent,deletedStudent}