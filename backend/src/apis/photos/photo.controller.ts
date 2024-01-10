import { IUser, IUserDoc } from '../users/user.model';
import { IPhotoService } from './photo.service';
import { Request, Response, NextFunction } from 'express';

export class PhotoController {
    constructor(private photoService: IPhotoService) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user: IUserDoc = (<any>req).user;


            const { title } = req.body;
            const image = req.file?.filename as string;
            const { name, id } = user;

            const newPhoto = await this.photoService.create(title, image, name, id);

            return res.json({ newPhoto });
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        // TODO: Verificar se a photo pertence ao usuário que está atualizando-a.
        try {
            const { id } = req.params;
            const { title } = req.body;

            const photo = await this.photoService.update(id, { title });

            res.json({ photo });
        } catch (error) {
            return next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        // TODO: Verificar se a photo pertence ao usuário que está atualizando-a.
        try {
            const { id } = req.params;


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

    async findManyByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const photos = await this.photoService.findManyByUserId(id);

            res.json({ photos });
        } catch (error) {
            return next(error);
        }
    }

    async likePhoto(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;
            const { id: userId }: IUserDoc = (<any>req).user;

            await this.photoService.likePhoto(id, userId);


            res.json({ photoId: id, userId, message: "A foto foi curtida." });
        } catch (error) {
            return next(error);
        }
    }
}