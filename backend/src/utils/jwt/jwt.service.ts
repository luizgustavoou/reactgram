import jwt from "jsonwebtoken";


export class JwtService {
    constructor(private jwtSecret: string) { }

    generateToken(id: any): string {
        return jwt.sign({ id }, this.jwtSecret, { expiresIn: "7d" });
    }
}