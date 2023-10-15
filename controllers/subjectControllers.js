import SubjectModel from "../models/SubjectModel.js";
import "express-async-errors"
import { StatusCodes } from "http-status-codes";

import mongoose from "mongoose";
import day from "dayjs";


export const getAllSubjects = async (req, res) => {
    const {search, subjectStatus, subjectType, sort} = req.query;

    const queryObject = {
        createdBy: req.user.userId
    };

    if (search) {
        queryObject.$or = [
            {subjectName: {$regex: search, $options: "i"}},
            {topic: {$regex: search, $options: "i"}}
        ];
    };

    if (subjectStatus && subjectStatus !== "all") {
        queryObject.subjectStatus = subjectStatus;
    };

    if (subjectType && subjectType !== "all") {
        queryObject.subjectType = subjectType;
    };

    const sortOptions = {
        newest: "-createdAt",
        oldest: "createdAt",
        "a-z": "subjectName",
        "z-a": "-subjectName"
    };

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;    

    const sortKey = sortOptions[sort] || sortOptions.newest;

    const subjects = await SubjectModel.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    const totalSubjects = await SubjectModel.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalSubjects / limit);

    res.status(StatusCodes.OK).json(
        {
            totalSubjects,
            numOfPages,
            currentPage: page,
            subjects
        }
    );
};

export const createSubject = async (req, res) => {

    req.body.createdBy = req.user.userId;

    const subject = await SubjectModel.create(
        req.body
    );

    res.status(StatusCodes.CREATED).json(
        {
            subject
        }
    );
};

export const getSubject = async (req, res) => {

    const {id} = req.params;

    const subject = await SubjectModel.findById(id);

    res.status(StatusCodes.OK).json(
        {
            subject
        }
    );
};

export const updateSubject = async (req, res) => {

    const {id} = req.params;

    const updatedSubject = await SubjectModel.findByIdAndUpdate(id, req.body, {
        new: true
    })

    res.status(StatusCodes.OK).json(
        {
            msg: "subject has been updated",
            subject: updatedSubject
        }
    );
};

export const deleteSubject = async (req, res) => {

    const {id} = req.params;

    const removedSubject = await SubjectModel.findByIdAndDelete(id);

    res.status(StatusCodes.OK).json(
        {
            msg: `the subject with id ${id} has been deleted`,
            deletedSubject: removedSubject
        }
    );
};

export const showStats = async (req, res) => {
    let stats = await SubjectModel.aggregate([
        {
            $match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}
        },
        {
            $group: {_id: "$subjectStatus", count: {$sum: 1}}
        }
    ]);

    stats = stats.reduce((acc, curr) => {
        const {_id: title, count} = curr;
        acc[title] = count;
        return acc;
    }, {})
    
    const defaultStats = {
        pending: stats.pending || 0,
        studying: stats.studying || 0,
        done: stats.done || 0
    };

    let monthlyApplications = await SubjectModel.aggregate([
        {
            $match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}
        },
        {
            $group: {
                _id: {year: {$year: "$createdAt"}, month: {$month: "$createdAt"}},
                count: {$sum: 1}
            }
        },
        {
            $sort: {"_id.year": -1, "_id.month": -1}
        },
        {
            $limit: 6
        }
    ]);

    monthlyApplications = monthlyApplications.map((item) => {
        const {_id: {year, month}, count} = item;
        const date = day().month(month - 1).year(year).format("MMM YYYY");

        return {date, count}
    }).reverse();

    res.status(StatusCodes.OK).json(
        {
            defaultStats,
            monthlyApplications
        }
    )

};