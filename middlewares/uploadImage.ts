import sharp from 'sharp'
import multer, { memoryStorage }  from 'multer';
import  expressAsyncHandler  from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';

// import { NextFunction, Request, Response } from "express"
// import expressAsyncHandler from "express-async-handler"

const storage = memoryStorage()

const multerFilter = (req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback)=>{
	if(file.mimetype.startsWith("image"))
		cb(null , true)
	else 
		cb(null, false)

}

const upload = multer({storage:storage , fileFilter:multerFilter}) // the place which the images will add on it

const uploadMiddlewareImage = upload.single("image")/* "image"  is the name of attribute which sent from the client body Parser*/

// const uploadMiddlewareImage = (req : Request , res : Response ,next : NextFunction)=>{
// 	next()
// }


const imageResizing =(filePath : string)=> expressAsyncHandler(async(req:any,res:Response,next:NextFunction)=>{ 
        
		const id:string = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
	    
		const fileName : string = `${id}-${Date.now()}`
		if (req.files?.image) {
			await sharp((req.files?.image as UploadedFile)?.data).resize(600 , 600).toFormat("png")
			
			.jpeg({quality:90})
			
			.toFile(`${filePath}${fileName}.png`) 
			
			req.fileName =`${fileName}.png`
		}
		const background : string = `${id}-${Date.now()}`
		if (req.files?.background) {
			await sharp((req.files?.background as UploadedFile)?.data).resize(600 , 600).toFormat("png")
			
			.jpeg({quality:90})
			
			.toFile(`${filePath}${background}.png`) 
			
			req.background =`${background}.png`
		}
		
		next() 
})

export {uploadMiddlewareImage , imageResizing}