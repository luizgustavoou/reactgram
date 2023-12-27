import { Router } from "express";
import { UserController } from './user.controller';
import { validate } from "../../middlewares/handleValidation";
import { userCreateValidation } from "../../middlewares/userValidation";

export class UserRouter {
    private router: Router;

    constructor(userController: UserController) {
        this.router = Router();

        this.router.post("/register", userCreateValidation(), validate, userController.register);

    }

    getRouter(): Router {
        return this.router;
    }
}


