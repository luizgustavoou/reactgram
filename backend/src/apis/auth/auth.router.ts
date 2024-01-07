import { Router } from "express";
import { validate } from "../../middlewares/handleValidation";
import { AuthController } from './auth.controller';
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { signInValidator, signUpValidator } from "./validator";

export class AuthRouter {
    private router: Router;

    constructor(private authController: AuthController, private authMiddleware: AuthMiddleware) {
        this.router = Router();

        this.router.post("/signup", signUpValidator.execute(), validate, this.authController.signup.bind(authController));

        this.router.post("/signin", signInValidator.execute(), validate, this.authController.signin.bind(authController));

        this.router.get("/profile", this.authMiddleware.execute.bind(authMiddleware), this.authController.getCurrentUser.bind(authController));



    }

    getRouter(): Router {
        return this.router;
    }
}


