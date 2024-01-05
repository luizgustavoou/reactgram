// DB connection
import "./config/db";

// routes
import { router } from "./routes/router";

import dotenv from "dotenv";

dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

const port = process.env.PORT;

const app = express();


// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // aceitar form data

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// routes
app.use(router);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
