import { Router } from "express";
import { UserController } from './user.controller';
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { userUpdateValidation } from "../../middlewares/authValidation";
import { validate } from "../../middlewares/handleValidation";
import { imageUpload } from "../../middlewares/imageUpload";

export class UserRouter {
    private router: Router;

    constructor(private userController: UserController, private authMiddleware: AuthMiddleware) {
        this.router = Router();

        this.router.get("/profile", this.authMiddleware.execute.bind(authMiddleware), this.userController.getCurrentUser);

        this.router.put("/", this.authMiddleware.execute.bind(authMiddleware), userUpdateValidation(), validate, imageUpload.single("profileimage"), this.userController.update);
    }

    getRouter(): Router {
        return this.router;
    }
}


