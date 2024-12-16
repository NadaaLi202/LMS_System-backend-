

import express from "express"
import { addReview, deletedReview, getAllReviews, getReviewById, updatedReview } from "./review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post('/',addReview)
reviewRouter.get('/',getAllReviews)
reviewRouter.get('/:id',getReviewById)
reviewRouter.put('/:id',updatedReview)
reviewRouter.delete('/:id',deletedReview)



export default reviewRouter;