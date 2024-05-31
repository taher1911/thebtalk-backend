import { Router } from "express";
import { protect } from "../middlewares/protect";
import { addNotification, getNotifications } from "../services/notification.services";
import validResult from "../middlewares/validationResult";
import { addNotificationValidation } from "../utils/notification/Notification.validations";

const route = Router();

// get all notifications ordered by desc (created at)
route.get("/", protect, getNotifications);

route.post("/", addNotificationValidation, validResult,  protect, addNotification);

export default route;