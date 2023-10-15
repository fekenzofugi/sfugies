// We've created a new folder and file to make the code in the server more lean and organized.

import { StatusCodes } from "http-status-codes";


const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);

    // status code is a attribute that we've added in the custonError.js
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    // this message is located in the jobControllers.js when we throw a notFoundError: 
    // throw new NotFoundError(`no job with id ${id}`);

    const msg = err.message || "something went wrong.";

    res.status(statusCode).json(
        {
            msg
        }
    );
};



export default errorHandlerMiddleware;