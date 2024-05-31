import { check } from "express-validator";

const loginValidation = [
    check("phoneNumber").notEmpty().withMessage("phone number is not valid"),
    check("requestNumber").isLength({ min: 6, max : 6 }).withMessage("requestNumber must be 6 characters"),
]

const verifyCodeValidation = [
    check("code").isLength({ min: 4, max : 4 }).withMessage("code must be 4 characters"),
]

const updateProfileValidation = [
    check("username").notEmpty().withMessage("username is required"),
    check("firstName").notEmpty().withMessage("firstName is required"),
    check("lastName").notEmpty().withMessage("lastName is required"),
    check("phoneNumber").notEmpty().withMessage("phone number is required"),
]

export { loginValidation, verifyCodeValidation, updateProfileValidation };