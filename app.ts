import path from 'path'
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';
import hpp from 'hpp';
import express,{ NextFunction, Request, Response, json, urlencoded } from "express";
import { StatusCodes } from "http-status-codes";
import { serve, setup } from 'swagger-ui-express';
import { createServer } from "http";
import { Server } from "socket.io";

import ApiError from "./utils/ApiError";
import { MainFiles } from './enums/ImagePath';
import { connect } from 'mongoose';
import { UserType } from './types/UserType';
import authRoute from './routes/auth.routes';
import notificationRoute from './routes/notification.routes';

require("dotenv").config()
const swaggerDocument = require('./docs/swagger.json');

const app  = express();
const server = createServer(app);
const io = new Server(server);


// global name space
declare global {
  namespace Express {
    interface Request {
      user: UserType,
      fileName:string,
      background:string,
    }
  }
}

// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(logger('combined'));
}
app.use(express.json({limit:'20kb'})) // limit the request
app.use(json());
app.use(fileUpload());
app.use(urlencoded({ extended: false }));
app.use(hpp({whitelist:['']})) // not sending array 
app.use(express.static(path.join(__dirname,`/${MainFiles.Uploads}`)))
app.use(cookieParser());
app.use(helmet())
app.use(cors())

// connect to database (mongodb)
connect(process.env.DATABASE_URL as string).then(()=>console.log("Database is connected"))
.catch((err)=>console.log(err.message))

// swagger
app.use('/api-docs', serve, setup(swaggerDocument));

// Restful API
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/notifications", notificationRoute)


// socket.io
io.on("connection",(socket)=>{
  console.log("socket is connected");
  socket.on("disconnect",()=>{
    console.log("socket is disconnected");
  })
})

// catch 404 and forward to error handler
app.use("*",function(req, res, next) {
  next(new ApiError("Page Not Found",StatusCodes.NOT_FOUND));
});

// error handler
app.use((err:ApiError, req:Request, res:Response, next:NextFunction)=> {
    res.status(err.statusCode || StatusCodes.BAD_REQUEST).json({
      message:err.message ,
      stack:err.stack,
      success:false
    })
});


// Port
server.listen(4000,()=>{
  console.log("server is running.....");
})


// unhandled error
process.on("unhandledRejection",(err:ApiError)=>{
  console.log(err.name);
  console.log(err.message);
})


export default io;