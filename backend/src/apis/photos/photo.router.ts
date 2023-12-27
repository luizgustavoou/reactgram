import { Router } from "express";
import { PhotoController } from "./photo.controller";


export class PhotoRouter {
    private router: Router;

    constructor(photoController: PhotoController) {
        this.router = Router();
    }

    getRouter(): Router {
        return this.router;
    }
}

