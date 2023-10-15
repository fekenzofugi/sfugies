import { Router } from "express";
import { register, login, logout } from "../controllers/authControllers.js";
import { validateUserInput, validateLoginInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateUserInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;