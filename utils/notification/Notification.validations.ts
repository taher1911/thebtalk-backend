import { check } from "express-validator";
import User from "../../Models/User";

const addNotificationValidation = [
    check("title").notEmpty().withMessage("Title is required"),
    check("text").notEmpty().withMessage("Text is required"),
    check("userId").notEmpty().withMessage("User is required").custom(async(value) => {
        await User.findById(value).then((user) => {
            if (!user) {
                return Promise.reject("User not found");
            }
            return true;
        });

    })
]

export { addNotificationValidation };