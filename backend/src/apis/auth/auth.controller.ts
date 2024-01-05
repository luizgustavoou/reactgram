import { NextFunction, Request, Response } from "express";
import { AuthService } from './auth.service';

export class AuthController {
    constructor(private authService: AuthService) { }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            const json = await this.authService.signup(name, email, password);

            return res.json(json);
        } catch (error) {
            next(error);
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {

        const { email, password } = req.body;

        try {
            const json = await this.authService.signin(email, password);

            return res.send(json);
        } catch (error) {
            next(error);
        }
    }
}