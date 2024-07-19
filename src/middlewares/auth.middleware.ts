import { NextFunction } from "express";
import { NotAuthenticatedError } from "../types/error_classes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.models";

// This is a global namespace modification, so any request will be modified and will have set a currentUser
declare global {
    namespace Express {
      interface Request {
        user: IUser;
      }
    }
}

export const authorizedRequest = async(req:any, res:Response, next:NextFunction)=>{
    let token:any;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        //set token from bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }
    
    //Make sure token is a non empty non null one
    if(token === undefined || !token)
        throw new NotAuthenticatedError('Not authenticated...')
    try{
        //verify the token
        const decoded:JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        console.log(decoded)
        req.user = await User.findById(decoded.id)
        next()
    }
    catch(err){
        console.log(err)
        throw new NotAuthenticatedError('Not authenticated...')
    }
}
