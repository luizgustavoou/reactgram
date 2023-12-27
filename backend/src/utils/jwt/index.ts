import { JwtService } from "./jwt.service";

const jwtSecret = process.env.JWT_SECRET || "";

const jwtService = new JwtService(jwtSecret);

export {
    jwtService
}