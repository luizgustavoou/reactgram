import { IUser, IUserDoc } from '../users/user.model';
import { PhotoService } from './photo.service';
import { Request, Response, NextFunction } from 'express';

export class PhotoController {
    constructor(private photoService: PhotoService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user: IUserDoc = (<any>req).user;


            const { title } = req.body;
            const image = req.file?.filename as string;
            const { name, _id } = user;

            const newPhoto = await this.photoService.create(title, image, name, _id);

            return res.json({ newPhoto });
        } catch (error) {
            return next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // TODO: receber o id do usuário e verificar se é igual ao userId do model photo.

            await this.photoService.remove(id);

            res.json({ id: id, message: "Foto excluída com sucesso." });

        } catch (error) {
            return next(error);
        }
    }

    async findOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const photo = await this.photoService.findOneById(id);

            res.json({ photo });
        } catch (error) {
            return next(error);
        }
    }

    async findMany(req: Request, res: Response, next: NextFunction) {
        try {
            const photos = await this.photoService.findMany();

            res.json({ photos });
        } catch (error) {
            return next(error);
        }
    }
}