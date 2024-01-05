import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "../apis/users/index";
import { authRouter } from "../apis/auth";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";

export const router = express();

router.use("/api/users", userRouter.getRouter());
router.use("/auth", authRouter.getRouter());