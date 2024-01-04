import { StatusCodes } from "http-status-codes";
import { UserService } from "../apis/users/user.service";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import { JwtService } from '../utils/jwt/jwt.service';
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async execute(req: Request, res: Response, next: NextFunction) {

        const token = this.extractTokenFromHeader(req);

        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ errors: ["Acesso negado."] })
        }

        try {
            const payload: any = this.jwtService.verify(token);

            (<any>req)["user"] = await this.userService.findOneById((<any>payload).id);

            next();


        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ errors: ["Token inválido."] })
        }


    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers["authorization"]?.split(" ") ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}

