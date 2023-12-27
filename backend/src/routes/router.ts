import express from "express";
import { router as userRouter } from "../apis/users/user.routes";
export const router = express();

router.use("/api/users", userRouter);

// test route
router.get("/", (req, res) => {
    res.send("API Funcionando!");
})

