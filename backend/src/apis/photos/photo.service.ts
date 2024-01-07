import { IPhotoDoc } from "./photo.model";
import { NotFoundError } from '../../exceptions/NotFoundError';
import { PhotoRepository } from "./repository/photo.repository";

export interface PhotoService {
    create(title: string, image: string): Promise<IPhotoDoc | null>;
}

export interface photoService {
    create(name: string, email: string, password: string): Promise<IPhotoDoc | null>;

    findOneById(id: string): Promise<IPhotoDoc | null>;

    findMany(): Promise<IPhotoDoc[]>;
}

export class PhotoServiceImpl implements PhotoService {
    constructor(private photoRepository: PhotoRepository) { }

    async create(title: string, image: string): Promise<IPhotoDoc | null> {
        const newPhoto = await this.photoRepository.create(
            title,
            image
        );

        return newPhoto;
    }

    async findOneById(id: string): Promise<IPhotoDoc | null> {
        const photo = await this.photoRepository.findOneById(id);

        if (!photo) {
            throw new NotFoundError("Imagem não encontrada.");
        }

        return photo;
    }

    async findMany(): Promise<IPhotoDoc[]> {
        const photos = await this.photoRepository.findMany();

        return photos;
    }
}