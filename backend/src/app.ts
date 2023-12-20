// routes
import { router } from "./routes/router";


import dotenv from "dotenv";

dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";

const port = process.env.PORT;

const app = express();


// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // aceitar form data

// routes
app.use(router);


app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
