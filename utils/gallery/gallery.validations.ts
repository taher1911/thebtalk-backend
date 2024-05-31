import { check } from "express-validator";

const addGalleryValidation = [
    check('fileUrl').notEmpty().withMessage('Name is required'),
    check('fileType').notEmpty().withMessage('User is required'),
    check('category').notEmpty().withMessage('Category is required'),
]

export { addGalleryValidation };