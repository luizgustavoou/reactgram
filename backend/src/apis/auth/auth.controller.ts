import { Request, Response } from "express";
import { AuthService } from './auth.service';
import { UnauthorizedError } from "../../exceptions/UnauthorizedError";
import { NotFoundError } from "../../exceptions/NotFoundError";
import { StatusCodes } from "http-status-codes";

export class AuthController {
    constructor(private authService: AuthService) { }

    async signup(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const json = await this.authService.signup(name, email, password);

            return res.json(json);
        } catch (error) {
            return res.status(422).json({ errors: [(error as any).message ?? "Houve algum erro desconhecido!"] });
        }
    }

    async signin(req: Request, res: Response) {

        const { email, password } = req.body;

        try {
            const json = await this.authService.signin(email, password);

            return res.send(json);
        } catch (error) {

            if (error instanceof UnauthorizedError
            ) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ errors: [(error as any).message ?? "Houve algum erro desconhecido!"] });
            }

            if (error instanceof NotFoundError) {
                return res.status(StatusCodes.NOT_FOUND).json({ errors: [(error as any).message ?? "Houve algum erro desconhecido!"] });
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: [(error as any).message ?? "Houve algum erro desconhecido!"] });
        }
    }
}