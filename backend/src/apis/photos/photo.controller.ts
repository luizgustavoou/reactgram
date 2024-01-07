import { PhotoService } from './photo.service';
import { Request, Response, NextFunction } from 'express';

export class PhotoController {
    constructor(private photoService: PhotoService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        const { title } = req.body;
        const image = req.file?.filename;


        console.log({ title, image })

        res.send('Handler of create photo.');
    }
}