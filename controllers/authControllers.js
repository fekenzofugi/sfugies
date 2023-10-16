// AUTHENTICATION CONTROLLERS.
// Setup 3 things: 
// 1- Register funcionality.
// 2- Login funcionality.
// 3- Logout funcionality.

import UserModel from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/tokenUtils.js";
import "express-async-errors";

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

    // Check if the email exists
    if(!user) {
        throw new UnauthenticatedError("invalid email")
    };

    const isPasswordCorrect = await comparePassword(req.body.password, user.password);

    // Check if the email already exists if the password is correct or not
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError("invalid password");
    };

    // The front-end will send the token and the server will decode it
    const token = createJWT({userId: user._id, role: user.role});

    // COOKIE, When we make the post request for the login, a cookie is created and will come back in every request made by this
    // user. We'll use it to secure the application and the jobs information.
    // With this statement, the cookie comes back in every request. We're going to use it to authenticate the user, if the token is
    // valid, we'll allow the user to make requests.
    const oneDay = 1000 * 60 * 60 * 24;


    // When a user logged in a cookie and a token gets created with the payload containing the user data. Each user that logged in,
    // will have a different data in the cookie.
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    });

    res.status(StatusCodes.OK).json(
        {
            msg: "user logged in",
            user: user
        }
    );
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