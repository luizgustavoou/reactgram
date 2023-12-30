import { Router } from "express";
import { UserController } from './user.controller';

export class UserRouter {
    private router: Router;

    constructor(userController: UserController) {
        this.router = Router();
    }

    getRouter(): Router {
        return this.router;
    }
}


