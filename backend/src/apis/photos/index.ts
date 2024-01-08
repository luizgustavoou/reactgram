import { authMiddleware, userService } from '../users';
import { PhotoController } from './photo.controller';
import { PhotoRouter } from './photo.router';
import { PhotoService, PhotoServiceImpl } from './photo.service';
import { MongoPhotoRepositoryImpl } from './repository/impl/photo.repository.mongo';
import { PhotoRepository } from './repository/photo.repository';

const photoRepository: PhotoRepository = new MongoPhotoRepositoryImpl();

const photoService: PhotoService = new PhotoServiceImpl(photoRepository, userService);

const photoController = new PhotoController(photoService);

const photoRouter = new PhotoRouter(photoController, authMiddleware);

export {
    photoService,
    photoController,
    photoRouter
}