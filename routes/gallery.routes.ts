import { Router } from "express";
import { addGalleryValidation } from "../utils/gallery/gallery.validations";
import validResult from "../middlewares/validationResult";
import { protect } from "../middlewares/protect";
import { addGallery, getGalleries } from "../services/gallery.services";

const router = Router();

router.post("/", addGalleryValidation, validResult, protect, addGallery);
router.get("/", protect, getGalleries);

export default router;