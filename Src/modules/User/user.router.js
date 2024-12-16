import express from "express"
import { addUser, changeUserPassword, deletedUser, getAllUsers, getUserById, updatedUser } from "./user.controller.js";

const userRouter = express.Router();

userRouter.post('/',addUser)
userRouter.get('/:id',getUserById)
userRouter.get('/',getAllUsers)
userRouter.put('/updateUser/:id',updatedUser)
userRouter.delete('/:id',deletedUser)
userRouter.patch('/id',changeUserPassword) 




export default userRouter