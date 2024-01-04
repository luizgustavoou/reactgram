import { Router } from "express";
import { UserController } from './user.controller';
import { AuthMiddleware } from "../../middlewares/authMiddleware";

export class UserRouter {
    private router: Router;

    constructor(private userController: UserController, private authMiddleware: AuthMiddleware) {
        this.router = Router();

        this.router.get("/profile", this.authMiddleware.execute.bind(authMiddleware), this.userController.getCurrentUser);
    }

    getRouter(): Router {
        return this.router;
    }
}


