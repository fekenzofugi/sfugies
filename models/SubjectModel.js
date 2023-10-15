import mongoose from "mongoose";

import { SUBJECT_STATUS, SUBJECT_TYPE } from "../utils/constants.js";

const SubjectSchema = new mongoose.Schema(
    {
        subjectName: String,
        topic: String,
        subjectStatus: {
            type: String,
            enum: Object.values(SUBJECT_STATUS),
            default: SUBJECT_STATUS.PENDING
        },
        subjectType: {
            type: String,
            enum: Object.values(SUBJECT_TYPE),
            default: SUBJECT_TYPE.HARD
        },
        subjectBibliography: {
            type: String,
            default: "course bibliography"
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Subject", SubjectSchema);