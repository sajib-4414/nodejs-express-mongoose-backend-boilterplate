import { Login, Register } from "../controllers/auth.controllers";
import { validateValidators } from "../middlewares/validation.middlewares";
import { loginValidators, registrationValidators } from "../utility/auth.validators"
import express from "express";

const router = express.Router()

router.route('/register')
.post(registrationValidators, validateValidators, Register)

router.route('/login')
.post(loginValidators, validateValidators, Login)

export {router as authRouter}