import { Router } from "express";
import { loginValidation, updateProfileValidation, verifyCodeValidation } from "../utils/auth/auth.validations";
import  validationResult  from "../middlewares/validationResult";
import { login, updateProfile, verify } from "../services/auth.services";
import { protect } from "../middlewares/protect";
import { imageResizing, uploadMiddlewareImage } from "../middlewares/uploadImage";


const routes = Router();

routes.post("/login", loginValidation, validationResult, login)

routes.post("/verify", verifyCodeValidation, validationResult, protect, verify)

routes.put("/update", updateProfileValidation, validationResult, protect, uploadMiddlewareImage, imageResizing , updateProfile)

export default routes;