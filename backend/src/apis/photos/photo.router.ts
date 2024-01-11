import { Router } from "express";
import { PhotoController } from "./photo.controller";
import { photoCreateValidator, photoUpdateValidator } from "./validator";
import { validate } from "../../middlewares/handleValidation";
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { imageUpload } from "../../middlewares/imageUpload";

export class PhotoRouter {
    private router: Router;

    constructor(private photoController: PhotoController, private authMiddleware: AuthMiddleware) {
        this.router = Router();

        this.router.delete("/:id", this.authMiddleware.execute.bind(authMiddleware), this.photoController.remove.bind(photoController));

        this.router.get("/", this.authMiddleware.execute.bind(authMiddleware), this.photoController.findMany.bind(photoController));

        this.router.get("/user/:id", this.authMiddleware.execute.bind(authMiddleware), this.photoController.findManyByUserId.bind
            (photoController));

        this.router.get("/search", this.authMiddleware.execute.bind(authMiddleware), this.photoController.searchPhotos.bind(photoController));

        this.router.get("/:id", this.authMiddleware.execute.bind(authMiddleware), this.photoController.findOneById.bind(photoController));

        this.router.put("/:id", this.authMiddleware.execute.bind(authMiddleware), photoUpdateValidator.execute(), validate, this.photoController.update.bind(photoController));

        this.router.put("/like/:id", this.authMiddleware.execute.bind(authMiddleware), this.photoController.likePhoto.bind(photoController));

        // TODO: Adicionar validação de adicionar comentário
        this.router.put("/comment/:id", this.authMiddleware.execute.bind(authMiddleware), this.photoController.commentPhoto.bind(photoController));

        this.router.post("/", this.authMiddleware.execute.bind(authMiddleware), imageUpload.single("image"), photoCreateValidator.execute(), validate, this.photoController.create.bind(photoController));

        this.router.put("/comment/:id", this.authMiddleware.execute.bind(authMiddleware), this.photoController.commentPhoto.bind(photoController));

    }

    getRouter(): Router {
        return this.router;
    }
}

