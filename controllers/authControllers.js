// AUTHENTICATION CONTROLLERS.
// Setup 3 things: 
// 1- Register funcionality.
// 2- Login funcionality.
// 3- Logout funcionality.

import UserModel from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/tokenUtils.js";

import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword } from "../utils/tokenUtils.js";
import { createJWT } from "../utils/passwordUtils.js";

// 1- Register controller POST
export const register = async (req, res) => {

    const isFirstAccount = await UserModel.countDocuments() === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await UserModel.create(req.body);

    res.status(StatusCodes.CREATED).json({user});
};

// 2- Login controller POST
export const login = async (req, res) => {

    const user = await UserModel.findOne({email: req.body.email});
    if(!user) {
        throw new UnauthenticatedError("invalid email");
    };

    const isPasswordCorrect = await comparePassword(req.body.password, user.password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError("invalid password");
    };

    const token = createJWT(
        {
            userId: user._id,
            role: user.role
        }
    );

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    });

    res.status(StatusCodes.OK).json({
        msg: "user logged in"
    });
};

// 3- Logout controller GET
export const logout = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({
        msg: "user logged out"
    });
}; 