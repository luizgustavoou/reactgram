import { Router } from "express";
import { validate } from "../../middlewares/handleValidation";
import { userCreateValidation } from "../../middlewares/userValidation";
import { AuthController } from './auth.controller';

export class AuthRouter {
    private router: Router;

    constructor(authController: AuthController) {
        this.router = Router();

        this.router.post("/signup", userCreateValidation(), validate, authController.signup.bind(authController));
    }

    getRouter(): Router {
        return this.router;
    }
}


