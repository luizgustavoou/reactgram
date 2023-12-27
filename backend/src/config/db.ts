import mongoose, { mongo } from "mongoose";

// connection
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
    try {
        const dbConn = await mongoose.connect('mongodb://root:pass@localhost:27017/myapp?authSource=admin');

        console.log("Conectou ao banco!");

        return dbConn;
    } catch (error) {
        console.log(error)
    }
}

conn();
