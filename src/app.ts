import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from './app/routes/index'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import config from './config';
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary';
const app: Application = express()

app.use(cors())
app.use(cors())
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

app.use(globalErrorHandler)

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

 cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
  });


export default app
