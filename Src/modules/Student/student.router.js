import express from "express"
import { addStudent, deletedStudent, getAllStudents, getStudentById, updatedStudent } from "./student.controller.js";


const studentRouter = express.Router();

studentRouter.post('/',addStudent)
studentRouter.get('/',getAllStudents)
studentRouter.get('/:id',getStudentById)
studentRouter.put('/:id',updatedStudent)
studentRouter.delete('/:id',deletedStudent)

export default studentRouter;