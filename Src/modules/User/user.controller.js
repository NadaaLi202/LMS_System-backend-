import { userModel } from "../../../dataBase/models/user.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";



const addUser = catchAsyncError(async(req,res,next) => {

    let foundUser = await userModel.findOne({email: req.body.email})
    if(foundUser){
            return  next(new AppError('User existed' ,409))
    }
    let user = new userModel(req.body)
    await user.save()
    res.status(200).json({message: "User created successfully",user})
})


const getUserById = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let user = await userModel.findById(id)
    if(!user){
        return next(new AppError('User not found',404))
    }
    res.status(200).json({message: "User fetched successfully",user})
})


const getAllUsers = catchAsyncError(async(req,res,next) => {

    const users = await userModel.find()
    if(!users) {
        return next(new AppError('Users not found',404))
    }
    res.status(200).json({message: "All users fetched successfully",Result:users.length,users})
})

const updatedUser = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let user = await userModel.findByIdAndUpdate(id, req.body, {new:true})
    if(!user) return next(new AppError('This user not found',401))
    res.status(200).json({message: "User updated successfully",user})

})

const deletedUser = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let user = await userModel.findByIdAndDelete(id)
    if(!user) return next(new AppError('This user not found',401))
    res.status(200).json({message: "User deleted successfully",user})

})

const changeUserPassword = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;
    let {password} = req.body;
    req.body.passwordChangedAt = Date.now()

    const user = await userModel.findByIdAndUpdate(id, {password} ,{new: true})
    if(!user)  return next (new AppError('User password not update',400))
    
     res.status(200).json({message: "User Password changed successfully",user})


})

export {addUser,getUserById,getAllUsers,updatedUser,deletedUser,changeUserPassword}