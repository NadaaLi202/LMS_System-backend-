import { quizModel } from "../../../dataBase/models/quiz.model.js";
import { studentModel } from "../../../dataBase/models/student.model.js";
import { submissionModel } from "../../../dataBase/models/submission.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";




const addSubmission = catchAsyncError(async(req,res,next) => {

    const studentId = req.body.student
    const quizId = req.body.quiz


    const foundStudent  = await studentModel.findById(studentId)
    const foundQuiz  = await quizModel.findById(quizId)
    if(!foundQuiz && !foundStudent){
        return next(new AppError('This student or quiz not found',404))
    }
    let submission = new submissionModel(req.body)
    await submission.save()
    res.status(200).json({message:"Submission add successfully",submission})

})

const getAllSubmissionOfSpecialStudent = catchAsyncError(async(req,res,next) => {

    const studentId = req.params.studentId
    const foundStudent  = await studentModel.findById(studentId) 
    if(!foundStudent) {
        return next(new AppError('This student not found',404))
    }
    let submission = await submissionModel.find({student: studentId})
    if(!submission){
        return next(new AppError('This student not have submissions ',404))
    }
    res.status(200).json({message:"Submission of this student fetched successfully",Result:submission.length ,submission})
})

const getSubmissionById = catchAsyncError(async(req,res,next)=> {

    const {id} = req.params
    let submission = await submissionModel.findById(id)
    if(!submission){
        return next(new AppError('Submission not found ',404))
    }
    res.status(200).json({message:"Submission  fetched successfully",submission})
})

const updatedSubmission = catchAsyncError(async(req,res,next)=> {

    const {id} = req.params
    let submission = await submissionModel.findByIdAndUpdate( id, req.body, {new: true} )
    if(!submission){
        return next(new AppError('Submission not found ',404)) 
    }
    res.status(200).json({message:"Submission  updated successfully",submission})
})

const deletedSubmission = catchAsyncError(async(req,res,next)=> {

    const {id} = req.params
    let submission = await submissionModel.findByIdAndDelete( id )
    if(!submission){
        return next(new AppError('Submission not found ',404)) 
    }
    res.status(200).json({message:"Submission  deleted successfully",submission})
})


export {addSubmission,getAllSubmissionOfSpecialStudent,getSubmissionById,updatedSubmission,deletedSubmission}