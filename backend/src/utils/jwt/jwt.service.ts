import jwt, { JwtPayload } from "jsonwebtoken";

export interface JwtService {
    generateToken(id: string): string;
    verify(token: string): JwtPayload | string

}
export class JwtServiceImpl implements JwtService {
    constructor(private jwtSecret: string) { }

    generateToken(id: string): string {
        return jwt.sign({ id }, this.jwtSecret, { expiresIn: "7d" });
    }

    verify(token: string): JwtPayload | string {
        return jwt.verify(token, this.jwtSecret);
    }
}