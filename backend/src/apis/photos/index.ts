import { PhotoController } from './photo.controller';
import { PhotoRouter } from './photo.router';
import { PhotoService } from './photo.service';

const photoService = new PhotoService();

const photoController = new PhotoController(photoService);

const photoRouter = new PhotoRouter(photoController);

export {
    photoService,
    photoController,
    photoRouter
}