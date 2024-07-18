import { NextFunction } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../types/error_classes";

export const validateValidators = (req:any,res:any,next:NextFunction)=>{
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        let allValidationErrors = ""
        validationErrors.array().forEach(err=>{
            allValidationErrors = allValidationErrors + err.msg+"\n"
        })
        throw new BadRequestError('Validation failed: ' + allValidationErrors);
    }

    next();
}