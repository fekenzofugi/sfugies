import { Router } from "express";
const router = Router();

import { getAllSubjects, createSubject, getSubject, updateSubject, deleteSubject, showStats } from "../controllers/subjectControllers.js";
import { validateSubjectInput, validateIdParam} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router.route("/")
.get(getAllSubjects)
.post(checkForTestUser, validateSubjectInput, createSubject);

router.route("/stats").get(showStats);

router.route("/:id")
.get(validateIdParam ,getSubject)
.patch(checkForTestUser ,validateIdParam, validateSubjectInput, updateSubject)
.delete(checkForTestUser, validateIdParam, deleteSubject)

export default router;