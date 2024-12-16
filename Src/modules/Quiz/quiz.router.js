

import express from "express"
import { addQuiz, deletedQuiz, getAllQuizOfSpecialLesson, getQuizById, updatedQuiz } from "./quiz.controller.js";

const quizRouter = express.Router();

quizRouter.post('/',addQuiz)
quizRouter.get('/:lessonId',getAllQuizOfSpecialLesson)
quizRouter.get('/getQuiz/:id',getQuizById)
quizRouter.put('/:id',updatedQuiz)
quizRouter.delete('/:id',deletedQuiz)


export default quizRouter;