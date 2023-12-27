import express from "express";
import { userRouter } from "../apis/users/index";

export const router = express();

router.use("/api/users", userRouter.getRouter());

// test route
router.get("/", (req, res) => {
    res.send("API Funcionando!");
})



