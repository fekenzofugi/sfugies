import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

// morgan middleweare
import morgan from "morgan";
if (process.env.NODE_ENV === "development") {
    // We'll use the morgan middleware in "dev" mode that logs the type of the request made, the status of the request and the time.
    app.use(morgan("dev"));
};

// json middleware
app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

// authenticate middleware
import { authenticateUser } from "./middleware/authMiddleware.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));

//routes

import authRouter from "./routes/authRouter.js";
app.use("/api/v1/auth", authRouter);

import subjectRouter from "./routes/subjectRouter.js";
app.use("/api/v1/subjects", authenticateUser, subjectRouter);

import userRouter from "./routes/userRouter.js";
app.use("/api/v1/users", authenticateUser, userRouter);

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
});

// send frontend 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

// not found middleware
app.use("*", (req, res) => {
    res.status(404).json(
        {
            msg: "not found"
        }
    );
});

//error middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5100;

import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}...`);
    });   
} catch (error) {
    console.log(error);
    process.exit(1);
};