import { Router } from "express";
import { validate } from "../../middlewares/handleValidation";
import { authSignInValidation, authSignUpValidation } from "../../middlewares/authValidation";
import { AuthController } from './auth.controller';

export class AuthRouter {
    private router: Router;

    constructor(authController: AuthController) {
        this.router = Router();

        this.router.post("/signup", authSignUpValidation(), validate, authController.signup.bind(authController));
        this.router.post("/signin", authSignInValidation(), validate, authController.signin.bind(authController));
    }

    getRouter(): Router {
        return this.router;
    }
}


