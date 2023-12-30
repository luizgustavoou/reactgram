import jwt from "jsonwebtoken";

export interface JwtService {
    generateToken(id: string): string;

}
export class JwtServiceImpl implements JwtService {
    constructor(private jwtSecret: string) { }

    generateToken(id: string): string {
        return jwt.sign({ id }, this.jwtSecret, { expiresIn: "7d" });
    }
}