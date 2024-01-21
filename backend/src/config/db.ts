import mongoose, { mongo } from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`
    );

    console.log("Conectou ao banco!");

    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();
