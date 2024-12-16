import { globalErrorMiddleware } from "../middleware/globalErrorMiddleware.js"
import { AppError } from "../utils/AppError.js"
import authRouter from "./auth/auth.router.js"
import courseRouter from "./Course/course.router.js"
import instructorRouter from "./Instructor/instructor.router.js"
import lessonRouter from "./Lesson/lesson.router.js"
import quizRouter from "./Quiz/quiz.router.js"
import reviewRouter from "./Review/review.router.js"
import studentRouter from "./Student/student.router.js"
import submissionRouter from "./Submission/submission.router.js"
import userRouter from "./User/user.router.js"


export function routes(app) {


    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/students',studentRouter)
    app.use('/api/v1/instructors',instructorRouter)
    app.use('/api/v1/courses',courseRouter)
    app.use('/api/v1/lessons',lessonRouter)
    app.use('/api/v1/quiz',quizRouter)
    app.use('/api/v1/submissions',submissionRouter)
    app.use('/api/v1/reviews',reviewRouter)






    app.use('*',(req,res,next) => {

        next(new AppError(`Route ${req.originalUrl} not found`,404))
    })

    app.use(globalErrorMiddleware)
}