// middleware will check:
// 1- If the token in authenticated and if is the test user
// 2- If the user is the admin
// 3- If it is the check user it will disable the subjects

import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/passwordUtils.js";


// 1- Check if the user is the user has the token
// 1.1- Check if the token is valid
export const authenticateUser = (req, res, next) => {

    const {token} = req.cookies;

    if (!token) {
        throw new UnauthenticatedError("authentication invalid");
    };

    // check if the jwt inside of the cookie is valid, then grab the id and the role.
    try {
        const {userId, role} = verifyJWT(token)

        const testUser = userId === "6528d3753c6db2258d711f1b";
        // this req.user object is available in all of the controllers with the authMiddleware.
        req.user = {userId, role, testUser};
        // next(): If everything is successfull, next() will pass the next middleware, in this case will pass to the controllers 
        // down below. Otherwise the request will stop in this middleware.
        next();        
    } catch (error) {
        throw new UnauthenticatedError("authentication invalid"); 
    };
};

// 2- Check if the user is an admin
export const authorizePermitions = (...roles) => {
    return((req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this route");
        };
        next();
    });
};

export const checkForTestUser = (req, res, next) => {
    if(req.user.testUser) {
        throw new BadRequestError("Demo user. Read Only!")
    };
    next();
};