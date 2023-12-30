import { JwtService, JwtServiceImpl } from "./jwt.service";

import dotenv from "dotenv";

dotenv.config()

const jwtSecret: string = process.env.JWT_SECRET as string;

const jwtService: JwtService = new JwtServiceImpl(jwtSecret);

export {
    jwtService
}