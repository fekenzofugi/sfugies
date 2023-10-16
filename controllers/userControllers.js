import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import SubjectModel from "../models/SubjectModel.js";

// 1- get the user that is logged in
export const getCurrentUser = async (req, res) => {

    const id = req.user.userId;

    const user = await UserModel.findOne({_id: id});

    const userWithoutPassword = user.toJSON();

    res.status(StatusCodes.OK).json(
        {
            user: userWithoutPassword
        }
    );
};

// 2- get the application stats the number os users and the subjects, this is an admin only controller
export const getApplicationStats = async (req, res) => {
    
    const users = await UserModel.countDocuments();
    const subjects = await SubjectModel.countDocuments();

    res.status(StatusCodes.OK).json(
{        users,
        subjects}
    );
};

// 3- update user profile
export const updateUser = async (req, res) => {
    const newUser = {...req.body};
    delete newUser.password;

    const id = req.user.userId;

    const updatedUser = await UserModel.findByIdAndUpdate(id, newUser);

    res.status(StatusCodes.OK).json(
        {
            msg: "update user",
            user: updatedUser
        }
    );

};