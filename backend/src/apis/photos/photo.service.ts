import { IPhotoDoc } from "./photo.model";
import { NotFoundError } from '../../exceptions/NotFoundError';
import { PhotoRepository } from "./repository/photo.repository";
import { InternalServerError } from "../../exceptions/InternalServerError";

export interface PhotoService {
    create(name: string, email: string, password: string): Promise<IPhotoDoc>;

    findOneById(id: string): Promise<IPhotoDoc>;

    findMany(): Promise<IPhotoDoc[]>;
}

export class PhotoServiceImpl implements PhotoService {
    constructor(private photoRepository: PhotoRepository) { }

    async create(title: string, image: string): Promise<IPhotoDoc> {
        const newPhoto = await this.photoRepository.create(
            title,
            image
        );

        if (!newPhoto) {
            throw new InternalServerError(new Error("Erro ao criar photo."), "Ocorreu algum erro interno no servidor. Por favor, tente novamente mais tarde.");
        }

        return newPhoto;
    }

    async findOneById(id: string): Promise<IPhotoDoc> {
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