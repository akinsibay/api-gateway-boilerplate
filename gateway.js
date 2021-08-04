/* eslint-disable no-undef */
import cookieParser from "cookie-parser";
import createError from "http-errors";
import express from "express";
import dotenv from "dotenv";
import router from "./routers/router";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import limitAccess from './middlewares/limitAccess'
import customErrorHandler from "./middlewares/customErrorHandler";
import connectDatabase from "./helpers/connectDatabase";
const app = express();

//Enviroment Variables
dotenv.config({
  path: "./config/env/config.env",
});
const PORT = process.env.PORT || 5000;
connectDatabase();
app.use(logger("dev"));
app.use(cors());
app.use(helmet());
app.use(limitAccess({
  windowMs: 10 * 60 * 1000, // 10 Minutes
  max: 500  
}))
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(`Gateway started on ${PORT}: ${process.env.NODE_ENV} `);
});

export default app;
