import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

const photoService = new PhotoService();

const photoController = new PhotoController(photoService);

export {
    photoService,
    photoController
}