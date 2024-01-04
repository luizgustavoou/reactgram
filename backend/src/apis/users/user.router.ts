import { Router } from "express";
import { UserController } from './user.controller';
import { AuthMiddleware } from "../../middlewares/authMiddleware";

export class UserRouter {
    private router: Router;

    constructor(private userController: UserController, private authGuard: AuthMiddleware) {
        this.router = Router();

        this.router.get("/profile", authGuard.execute.bind(authGuard), userController.getCurrentUser);
    }

    getRouter(): Router {
        return this.router;
    }
}


