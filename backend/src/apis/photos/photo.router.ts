import { Router } from "express";
import { PhotoController } from "./photo.controller";
import { photoCreateValidator } from "./validator";
import { validate } from "../../middlewares/handleValidation";
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { imageUpload } from "../../middlewares/imageUpload";


export class PhotoRouter {
    private router: Router;

    constructor(private photoController: PhotoController, private authMiddleware: AuthMiddleware) {
        this.router = Router();

        this.router.get("/", this.authMiddleware.execute.bind(authMiddleware), this.photoController.findMany.bind(photoController));

        this.router.get("/:id", this.authMiddleware.execute.bind(authMiddleware), this.photoController.findOneById.bind(photoController));

        this.router.delete("/:id", this.authMiddleware.execute.bind(authMiddleware), this.photoController.remove.bind(photoController));

        this.router.post("/", this.authMiddleware.execute.bind(authMiddleware), imageUpload.single("image"), photoCreateValidator.execute(), validate, this.photoController.create.bind(photoController));
    }

    getRouter(): Router {
        return this.router;
    }
}

