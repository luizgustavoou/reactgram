// DB connection
import "./config/db";

// routes
import { router } from "./routes/router";
import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";

dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import { UnauthorizedError } from "./exceptions/UnauthorizedError";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "./exceptions/NotFoundError";
import { ConflictError } from "./exceptions/ConflictError";

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UnauthorizedError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors: [err.message] });
  }

  if (err instanceof NotFoundError) {
    return res.status(StatusCodes.NOT_FOUND).json({ errors: [err.message] });
  }

  if (err instanceof ConflictError) {
    return res.status(StatusCodes.CONFLICT).json({ errors: [err.message] });

  }

  console.log(err.message);
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: ["Ocorreu um erro inesperado. Tente novamente"] });
});


app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
