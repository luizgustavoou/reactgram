import { Router } from "express";
import { validate } from "../../middlewares/handleValidation";
import { authSignInValidation, authSignUpValidation } from "../../middlewares/authValidation";
import { AuthController } from './auth.controller';
import { AuthMiddleware } from "../../middlewares/authMiddleware";

export class AuthRouter {
    private router: Router;

    constructor(private authController: AuthController, private authMiddleware: AuthMiddleware) {
        this.router = Router();

        this.router.post("/signup", authSignUpValidation(), validate, this.authController.signup.bind(authController));

        this.router.post("/signin", authSignInValidation(), validate, this.authController.signin.bind(authController));

        this.router.get("/profile", this.authMiddleware.execute.bind(authMiddleware), this.authController.getCurrentUser.bind(authController));



    }

    getRouter(): Router {
        return this.router;
    }
}


