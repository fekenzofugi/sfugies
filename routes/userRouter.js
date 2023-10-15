import { Router } from "express";
import { getCurrentUser, getApplicationStats, updateUser } from "../controllers/userControllers.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermitions, checkForTestUser } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", authorizePermitions("admin"), getApplicationStats);
router.patch("/update-user", checkForTestUser, validateUpdateUserInput, updateUser)

export default router;