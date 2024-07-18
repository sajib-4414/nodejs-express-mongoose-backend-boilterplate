import { NextFunction, Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { CustomErrorResponse } from '../types/error_classes';
export const globalErrorHandler = (err:Error, req:Request, res:Response, next:NextFunction)=>{

    console.log(err)
    if(err instanceof CustomErrorResponse){
        res.status(err.statusCode).send({
            errors: err.formattedErrors()
        })
        return; 
    }
    else if (err instanceof MongoServerError && err.code === 11000) {
        // Duplicate key error
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        
        console.log(err)
        return res.status(400).send({
            errors:[{
                message: `Duplicate key error: ${field} with value ${value} already exists.`,
            }]
        })
      }
    //coming here meanserror was not a defined custom error
    console.log(err)
    res.status(400).send({
        errors:[{
            message:'Unexpected server error, see stacktrace'
        }]
    })
}