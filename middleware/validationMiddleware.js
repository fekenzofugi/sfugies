import { body, validationResult } from "express-validator";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";

// This middleware will check if 
// 1- Subject input is valid
// 2- The user id is valid and If the user is admin
// 3- The register input is valid
// 4- The login input is valid
// 5- The update user input is valid

const withValidationErrors = (validateValues) => {
    return [validateValues, (req, res, next) => {

        // ValidationResult it checks for the data specified in body the validation of the rules passed.
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            
            const errorMessages = errors.array().map((error) => (error.msg));

            if (errorMessages[0].startsWith("no subject")) {
                throw new NotFoundError(errorMessages);
            };
            if (errorMessages[0].startsWith("not authorized")) {
                throw new UnauthorizedError("not authorized to access this route");
            };
            throw new BadRequestError(errorMessages);
        };

        next();
    
    }]
};

// 1- check if the subject input is valid
import { SUBJECT_STATUS, SUBJECT_TYPE } from "../utils/constants.js";

export const validateSubjectInput = withValidationErrors([
    body("subjectName").notEmpty().withMessage("subject name is required"),
    body("topic").notEmpty().withMessage("topic is required"),
    body("subjectBibliography").notEmpty().withMessage("subject bibliography is required"),
    body("subjectStatus").isIn(Object.values(SUBJECT_STATUS)).withMessage("invalid subject status value"),
    body("subjectType").isIn(Object.values(SUBJECT_TYPE)).withMessage("invalid subject type")
]);

// 2- check if the user id is valid
import mongoose from "mongoose";
import { param } from "express-validator";
import SubjectModel from "../models/SubjectModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const validateIdParam = withValidationErrors([
    param("id").custom(async (value, {req}) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if(!isValidId) {
            throw new BadRequestError("invalid MongoDB id");
        };

        const subject = await SubjectModel.findById(value);
        if(!subject) {
            throw new NotFoundError(`no subject with id ${value}`);
        };

        const isAdmin = req.user.role === "admin";
        const isOwner = req.user.userId === subject.createdBy.toString();
        console.log(subject.createdBy)
        if(!isAdmin && !isOwner) {
            throw new UnauthorizedError("not authorized to access this route");
        };
    })
]);

// 3- check if the register input is valid
import UserModel from "../models/UserModel.js";

export const validateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email format").custom( async(email) => {
        const user = await UserModel.findOne({email});
        if (user) {
            throw new BadRequestError("email already exists");
        };
    }),
    body("password").notEmpty().withMessage("password is required")
    .isLength({min: 8}).withMessage("password must be at least 8 characters long"),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required"),
]);

// 4- check if the login is valid
export const validateLoginInput = withValidationErrors([
    body("email").notEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email format"),
    body("password").notEmpty().withMessage("password is required")
]);

// 5- check if the update of the user is valid
export const validateUpdateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email format").custom( async(email, {req}) => {
        const user = await UserModel.findOne({email});
        console.log(req)
        // Check if the user exists and the user it's really using this email that we checked that exists above.
        if (user && user._id.toString() !== req.user.userId ) {
            throw new BadRequestError("email already exists");
        };
    }),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required"),
]);