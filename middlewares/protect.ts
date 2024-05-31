import { NextFunction, Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import ApiError from './../utils/ApiError';
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { UserType } from "../types/UserType";
import User from "../Models/User";
import { DecodedToken } from "../types/DecodedToken";

const protect = expressAsyncHandler(async function(req:Request,res:Response,next:NextFunction){
    if (req.headers.authorization || req.body.token) {
        let token = req.headers.authorization?.toString().split(" ")[1] || req.body.token
        if (token == "null") {
            token = req.body.token
        }
        const decode : DecodedToken = verify(String(token),`${process.env.JWT_SECRET_KEY}`) as DecodedToken
        const user  = await User.findById(decode.id)
        if (user) {
            req.user = user as unknown as UserType
            next()
        } else {
            next(new ApiError("User not found", StatusCodes.NOT_FOUND))
        }
    }
    else next(new ApiError("You're not logged In", StatusCodes.UNAUTHORIZED))
    
})


// const role =([...params])=> expressAsyncHandler(async function(req:Request,res:Response,next:NextFunction){  
//     if (params.includes(req.user.role)) {
//         next()
//     }
//     else
//         next(new ApiError("this Route doesn't allowed to you",StatusCodes.UNAUTHORIZED))
// })

export { protect }