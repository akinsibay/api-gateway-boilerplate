/* eslint-disable no-undef */
import ErrorClass from "../helpers/ErrorClass";
import asyncErrorWrapper from "express-async-handler";
import User from "../models/User";
import { sendJwtToClient,comparePassword } from "../helpers/authHelpers";
export const register = asyncErrorWrapper(async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).send({
        success: true,
        user
    })
});
export const login = asyncErrorWrapper(async (req, res,next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (comparePassword(password, user.password)) {
        return sendJwtToClient(user, res);
    }
    return next(new ErrorClass("Please check your info", 400));
});
export const logout = asyncErrorWrapper(async (req, res) => {
    const { NODE_ENV } = process.env;
    return res.status(200).cookie({
        httpOnly:true,
        expires: new Date(Date.now()), //token ı hemen expire et
        secure: NODE_ENV === "development" ? false : true
    })
    .json({
        success:true,
        message:"Logout successfull"
    })
});
