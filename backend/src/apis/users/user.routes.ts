// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const jwtSecret = process.env.JWT_SECRET || "";

// // Generate user token
// const generateToken = (id: any) => {
//     return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
// }

import { Router } from "express";
import { userController } from ".";

export const router = Router();

// Routes
router.post("/register", userController.register);

