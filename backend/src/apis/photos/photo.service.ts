import { IComment, IPhotoDoc } from "./photo.model";
import { NotFoundError } from '../../exceptions/NotFoundError';
import { PhotoRepository } from "./repository/photo.repository";
import { InternalServerError } from "../../exceptions/InternalServerError";
import { IUserService } from '../users/user.service';
import { IUpdatePhotoDto } from "./dtos/UpdatePhotoDto";
import { ConflictError } from "../../exceptions/ConflictError";
import { ICommentDto } from "./dtos/CommentDto";

export interface IPhotoService {
    create(title: string, image: string, userName: string, userId: string): Promise<IPhotoDoc>;

    update(id: string, updatePhotoDto: IUpdatePhotoDto): Promise<IPhotoDoc>

    remove(id: string): Promise<void>;

    findOneById(id: string): Promise<IPhotoDoc>;

    findMany(): Promise<IPhotoDoc[]>;

    findManyByUserId(userId: string): Promise<IPhotoDoc[]>;

    likePhoto(id: string, userId: string): Promise<void>;

    commentPhoto(id: string, commentDto: ICommentDto): Promise<void>;

}

export class PhotoServiceImpl implements IPhotoService {
    constructor(private photoRepository: PhotoRepository, private userService
        : IUserService) { }
    async create(title: string, image: string, userName: string, userId: string): Promise<IPhotoDoc> {
        const newPhoto = await this.photoRepository.create(
            title,
            image,
            userName,
            userId
        );

        if (!newPhoto) {
            throw new InternalServerError(new Error("Erro ao criar imagem."), "Ocorreu algum erro interno no servidor. Por favor, tente novamente mais tarde.");
        }

        return newPhoto;
    }

    async update(id: string, updatePhotoDto: IUpdatePhotoDto): Promise<IPhotoDoc> {
        const photo = await this.photoRepository.update(id, updatePhotoDto);

        if (!photo) {
            throw new NotFoundError("Imagem não encontrado.");
        }

        return photo;
    }

    async remove(id: string): Promise<void> {
        const photo = await this.findOneById(id);

        if (!photo) {
            throw new NotFoundError("Imagem não encontrada.");
        }

        await this.photoRepository.remove(id);

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

    async findManyByUserId(userId: string): Promise<IPhotoDoc[]> {
        const photos = await this.photoRepository.findManyByUserId(userId);

        return photos;
    }

    async likePhoto(id: string, userId: string): Promise<void> {
        const photo = await this.findOneById(id);

        if (photo.likes.includes(userId)) {
            throw new ConflictError("Você já curtiu a foto");
        }

        photo.likes.push(userId);

        photo.save();
    }

    async commentPhoto(id: string, commentDto: IComment): Promise<void> {
        const photo = await this.findOneById(id);

        photo.comments.push(commentDto);

        photo.save();
    }

}