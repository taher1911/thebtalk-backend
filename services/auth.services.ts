import { NextFunction, Request, Response } from "express";
import User from "../Models/User";
import { StatusCodes } from "http-status-codes";
import expressAsyncHandler from "express-async-handler";
import { sign } from "jsonwebtoken";
import sendSMSMessage from "../middlewares/twilio";
import ApiError from "../utils/ApiError";

// @desc       signup
// @route     /api/v1/auth/signup
// @access    POST/public
export const login = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, requestNumber } = req.body;

    // check if the phone and request number are exist in the db if yes return the send the code to the user and generate a token
    const checkIfExist = await User.findOne({ phoneNumber, requestNumber });
    if(checkIfExist){
        const token: string = sign(
            { id: checkIfExist._id },
            `${process.env.JWT_SECRET_KEY}`,
            { expiresIn: `${process.env.EXPIRATION_TIME}` }
        );
        let code = Math.floor(1000 + Math.random() * 9000).toString()
        await sendSMSMessage({ phoneNumber, text: code });
        checkIfExist.code = code;
        await checkIfExist.save();
        res.status(StatusCodes.OK).json({
            success: true,
            data: { user : {
                username: checkIfExist.username,
                firstName: checkIfExist.firstName,
                lastName: checkIfExist.lastName,
                phoneNumber,
            } , token },
        });
    }
    else{
    let username = "";
    let firstName = "";
    let lastName = "";
    // you should call wordpress api to get the user data 


    const user = await User.create({
        username,
        firstName,
        lastName,
        phoneNumber,
        code : Math.floor(1000 + Math.random() * 9000).toString(),    
        requestNumber,
        inviteNumber : Math.floor(10000 + Math.random() * 90000).toString(),
    });


    const token: string = sign(
        { id: user._id },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: `${process.env.EXPIRATION_TIME}` }
    );


    res.status(StatusCodes.CREATED).json({
            success: true,
            data: { user : {
                username,
                firstName,
                lastName,
                phoneNumber,
            } , token },
    });
    }
});


// @desc       verify
// @route     /api/v1/auth/verify
// @access    POST/public
export const verify = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user !== null) {
        if (user.code === req.body.code) 
        {
            user.code = "";
            await User.findByIdAndUpdate(user._id, user, { new: true })
            res.status(StatusCodes.OK).json({
                success: true,
                data: {
                    user: {
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                    },
                    token: sign(
                        { id: user._id },
                        `${process.env.JWT_SECRET_KEY}`,
                        { expiresIn: `${process.env.EXPIRATION_TIME}` }
                    ),
                },
            });
        }
        else
        {
            next(new ApiError("Invalid code", StatusCodes.BAD_REQUEST));
        }

    }
    
    res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid code",
    });
});


// @desc       update-profile
// @route     /api/v1/auth/update-profile
// @access    PUT/private
export const updateProfile = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { username, firstName, lastName } = req.body;

    if (user !== null) {
        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.profileImage = req.fileName;
        await User.findByIdAndUpdate(user._id, user, { new: true })
        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                user: {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                },
            },
        });
    }

    res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid code",
    });
});