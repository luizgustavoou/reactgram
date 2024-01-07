import { PhotoService } from './photo.service';
import { Request, Response, NextFunction } from 'express';

export class PhotoController {
    constructor(private photoService: PhotoService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        
        
        res.send('Handler of create photo.');
    }
}