import express from "express";
import { userRouter } from "../apis/users/index";
import { authRouter } from "../apis/auth";

export const router = express();

router.use("/api/users", userRouter.getRouter());
router.use("/auth", authRouter.getRouter());

// test route
router.get("/", (req, res) => {
    res.send("API Funcionando!");
})



