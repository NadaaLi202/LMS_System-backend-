

import express from "express";
import { createInstructor, deletedInstructor, getAllInstructors, getInstructorById, updatedInstructor } from "./instructor.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const instructorRouter = express.Router();


instructorRouter.post('/',protectedRoutes,allowedTo('admin'),createInstructor)
instructorRouter.get('/',protectedRoutes,allowedTo('admin'),getAllInstructors)
instructorRouter.get('/:id',protectedRoutes,allowedTo('admin'),getInstructorById)
instructorRouter.put('/:id',protectedRoutes,allowedTo('admin'),updatedInstructor)
instructorRouter.delete('/:id',protectedRoutes,allowedTo('admin'),deletedInstructor)


export default instructorRouter
