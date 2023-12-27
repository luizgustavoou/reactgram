import { Router } from "express";
import { userController } from ".";

export const router = Router();

// Routes
router.post("/register", userController.register);

