import { authMiddleware } from '../users';
import { PhotoController } from './photo.controller';
import { PhotoRouter } from './photo.router';
import { PhotoService, PhotoServiceImpl } from './photo.service';

const photoService: PhotoService = new PhotoServiceImpl();

const photoController = new PhotoController(photoService);

const photoRouter = new PhotoRouter(photoController, authMiddleware);

export {
    photoService,
    photoController,
    photoRouter
}