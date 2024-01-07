import { Router } from "express";
import { UserController } from './user.controller';
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { validate } from "../../middlewares/handleValidation";
import { imageUpload } from "../../middlewares/imageUpload";
import { findOneAndUpdateValidator } from "./validator";

export class UserRouter {
    private router: Router;

    constructor(private userController: UserController, private authMiddleware: AuthMiddleware) {
        this.router = Router();

        this.router.get("/", this.authMiddleware.execute.bind(authMiddleware), this.userController.findMany.bind(userController));

        this.router.get("/:id", this.authMiddleware.execute.bind(authMiddleware), this.userController.findOneById.bind(userController));

        this.router.put("/", this.authMiddleware.execute.bind(authMiddleware), findOneAndUpdateValidator.execute(), validate, imageUpload.single("profileimage"), this.userController.findOneAndUpdate.bind(userController));
    }

    getRouter(): Router {
        return this.router;
    }
}


