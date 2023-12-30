import { Request, Response } from "express";
import { AuthService } from './auth.service';

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
        res.send("Handle login!");
    }
}