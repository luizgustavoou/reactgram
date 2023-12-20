import express from "express";

export const router = express();

// test route
router.get("/", (req, res) => {
    res.send("API Funcionando!");
})