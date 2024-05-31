import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Gallery from "../Models/Galleries";


// @desc       add gallery
// @route     /api/v1/gallery
// @access    POST/private
const addGallery = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { fileUrl, fileType, category, title } = req.body;
        const gallery = await Gallery.create({ fileUrl, fileType, category, userId: req.user._id, title });
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: gallery,
        });
    }
);

// @desc       get all galleries paginated
// @route     /api/v1/gallery
// @access    GET/public
const getGalleries = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
        let pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;

        const galleries = await Gallery
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
            data: galleries,
        });
    }
);

export { addGallery, getGalleries };