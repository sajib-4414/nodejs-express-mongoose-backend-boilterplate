import { Request, Response } from "express"
import { IUser } from "../models/user.models"
import { getAllDBUsers } from "../services/user.services"

export const getAllUsers = async (req:Request, res:Response)=>{
    const all_users:IUser[] = await getAllDBUsers()
    res.json(all_users)
}