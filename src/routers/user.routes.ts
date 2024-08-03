import { getAllUsers } from "../controllers/user.controllers"
import express from "express";

const userRouter = express.Router()

userRouter.route('/all')
.get(getAllUsers)

export { userRouter}