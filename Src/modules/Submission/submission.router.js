

import express from "express"
import { addSubmission, deletedSubmission, getAllSubmissionOfSpecialStudent, getSubmissionById, updatedSubmission } from "./submission.controller.js";

const submissionRouter = express.Router();

submissionRouter.post('/',addSubmission)
submissionRouter.get('/:studentId',getAllSubmissionOfSpecialStudent) 
submissionRouter.get('/getSubmission/:id',getSubmissionById)
submissionRouter.put('/:id',updatedSubmission)
submissionRouter.delete('/:id',deletedSubmission)


export default submissionRouter;