import { StatusCodes } from 'http-status-codes';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';
export class UserController {

    constructor(private userService: UserService) { }

    async findOneAndUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name, password, bio } = req.body;

            const user = await this.userService.findOneAndUpdate(id, { name, password, bio });

            return res.send(user);

        } catch (error) {
            return next(error);
        }
    }

    async findOneById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const user = await this.userService.findOneById(id);

        res.send(user);
    }

    async findMany(req: Request, res: Response, next: NextFunction) {
        const users = await this.userService.findMany();

        res.send(users);
    }
}