import express from "express";
import { addCourse, deletedCourse, getAllCourses, getCourseById, updateCourse } from "./course.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { fileUpload } from "../../middleware/fileUpload.js";

const courseRouter = express.Router();

courseRouter.post('/',protectedRoutes,allowedTo('admin'),fileUpload('courseImage','course'),addCourse)
courseRouter.get('/',getAllCourses)
courseRouter.get('/:id',getCourseById)
courseRouter.put('/:id',protectedRoutes,allowedTo('admin'),updateCourse)
courseRouter.delete('/:id',protectedRoutes,allowedTo('admin'),deletedCourse)
export default courseRouter;
