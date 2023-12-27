import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
    constructor(private userService: UserService) { }

    async register(req: Request, res: Response) {
        res.send("Registro");
    }
}