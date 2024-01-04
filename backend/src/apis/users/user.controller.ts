import { StatusCodes } from 'http-status-codes';
import { UserService } from './user.service';
import { Request, Response } from 'express';
export class UserController {

    constructor(private userService: UserService) { }

    getCurrentUser(req: Request, res: Response) {
        const user = (<any>req).user;

        res.status(StatusCodes.OK).json(user);
    }

    update(req: Request, res: Response) {
        res.send("Handle update user");
    }
}