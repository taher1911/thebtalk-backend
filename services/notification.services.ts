import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Notification from "../Models/Notifications";

// @desc       get all notifications
// @route     /api/v1/notifications
// @access    GET/public
const getNotifications = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
        let pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;

        const notifications = await Notification
            .find(
                {
                    userId: req.user._id,
                }
            )
            .limit(pageSize)
            .skip(pageSize * (pageNumber - 1))
            .sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json({
            success: true,
            data: notifications,
        });
    }
);


// @desc       Add notification to user
// @route     /api/v1/notifications
// @access    POST/public
const addNotification = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { title , text, userId } = req.body;
        const notification = await Notification.create({ title, text, userId });
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: notification,
        });
    }
);

export { getNotifications, addNotification };