import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "../apis/users/index";
import { authRouter } from "../apis/auth";
import fs from "fs";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";

export const router = express();

router.use("/api/users", userRouter.getRouter());
router.use("/auth", authRouter.getRouter());

router.get("/", async (req, res, next) => {
  
})