import express from "express"
import { signIn, signup } from "./auth.controller.js";

const authRouter = express.Router()

authRouter.post('/signup',signup)
authRouter.post('/signIn',signIn)


export default authRouter;