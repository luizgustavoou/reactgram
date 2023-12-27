import { Router } from "express";
import { UserController } from './user.controller';
import { validate } from "../../middlewares/handleValidation";

export class UserRouter {
    private router: Router;

    constructor(userController: UserController) {
        this.router = Router();

        this.router.post("/register", validate, userController.register);

    }

    getRouter(): Router {
        return this.router;
    }
}


