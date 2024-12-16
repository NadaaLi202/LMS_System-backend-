import express from "express"
import { addLesson, deletedLesson, getAllLessonOfSpecialCourse, getLessonById, updatedLesson } from "./lesson.controller.js";

const lessonRouter = express.Router();

lessonRouter.post('/',addLesson)
lessonRouter.get('/:courseId',getAllLessonOfSpecialCourse)
lessonRouter.get('/onlyLesson/:id',getLessonById)
lessonRouter.put('/:id',updatedLesson)
lessonRouter.delete('/:id',deletedLesson)

export default lessonRouter