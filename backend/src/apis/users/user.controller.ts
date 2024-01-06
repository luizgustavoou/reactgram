import { StatusCodes } from 'http-status-codes';
import { UserService } from './user.service';
import { Request, Response } from 'express';
export class UserController {

    constructor(private userService: UserService) { }

    async update(req: Request, res: Response) {
        res.send("Handle update user");
    }

    async findOneById(req: Request, res: Response) {
        const { id } = req.params;

        const user = await this.userService.findOneById(id);

        res.send(user);
    }

    async findMany(req: Request, res: Response) {
        const users = await this.userService.findMany();

        res.send(users);

    }

}