import { IPhotoDoc, Photo } from '../../photo.model';
import { PhotoRepository } from "../photo.repository";

export class MongoPhotoRepositoryImpl implements PhotoRepository {
    async create(title: string, image: string): Promise<IPhotoDoc> {
        const photo = await Photo.create({
            title,
            image,
        });

        return photo;
    }

    async findOneById(id: string): Promise<IPhotoDoc | null> {
        const photo = await Photo.findById(id);

        return photo;
    }

    async findMany(): Promise<IPhotoDoc[]> {
        const photos = await Photo.find({});

        return photos;
    }

}