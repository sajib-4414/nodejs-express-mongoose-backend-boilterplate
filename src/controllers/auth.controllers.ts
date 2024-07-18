import { Request, Response } from "express";
import { login, register } from "../services/auth.services";

export const Register = async(req:Request, res:Response)=>{
    const {user,token} = await register(req.body)
    res.status(201)
    .json({
        user:user,
        token:token
    })
}


export const Login = async(req:Request, res:Response)=>{

    const {user,token} = await login(req.body)
    res.status(201)
    .json({
        user:user,
        token:token
    })
}