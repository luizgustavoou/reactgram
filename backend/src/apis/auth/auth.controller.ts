import { NextFunction, Request, Response } from "express";
import { AuthService } from './auth.service';
import { StatusCodes } from "http-status-codes";

export class AuthController {
    constructor(private authService: AuthService) { }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            const json = await this.authService.signup(name, email, password);

            return res.json(json);
        } catch (error) {
            console.log(error)
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

    getCurrentUser(req: Request, res: Response) {
        const user = (<any>req).user;

        // res.status(StatusCodes.OK).json(user);
        res.json(user);
    }
}