import { Router } from "express";
import { PhotoController } from "./photo.controller";
import { photoCreateValidator } from "./validator";
import { validate } from "../../middlewares/handleValidation";
import { AuthMiddleware } from '../../middlewares/authMiddleware';


export class PhotoRouter {
    private router: Router;

    constructor(private photoController: PhotoController, private authMiddleware: AuthMiddleware) {
        this.router = Router();

        this.router.post("/", this.authMiddleware.execute.bind(authMiddleware), photoCreateValidator.execute(), validate, this.photoController.create.bind(photoController));
    }

    getRouter(): Router {
        return this.router;
    }
}

