import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const validResult = (req:Request,res:Response,next:NextFunction)=>{   
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(StatusCodes.BAD_REQUEST).json({
            data:errors.array(),
            message:"Validation Error",
            success:false
        })
    } 
    next()
} 

export default validResult