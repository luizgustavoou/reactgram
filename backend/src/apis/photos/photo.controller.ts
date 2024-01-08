import { PhotoService } from './photo.service';
import { Request, Response, NextFunction } from 'express';

export class PhotoController {
    constructor(private photoService: PhotoService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title } = req.body;
            const image = req.file?.filename;


            console.log({ title, image })

            return res.send('Handler of create photo.');
        } catch (error) {
            return next(error);
        }
    }

    async findOneById(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const photo = await this.photoService.findOneById(id);

            res.send(photo);
        } catch (error) {
            return next(error);
        }
    }

    async findMany(req: Request, res: Response, next: NextFunction) {
        try {
            const photos = await this.photoService.findMany();

            res.send(photos);
        } catch (error) {
            return next(error);
        }
    }
}