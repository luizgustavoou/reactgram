import { IPhotoDoc, Photo } from '../../photo.model';
import { PhotoRepository } from "../photo.repository";

export class MongoPhotoRepositoryImpl implements PhotoRepository {

    async create(title: string, image: string, userName: string, userId: string): Promise<IPhotoDoc> {
        const photo = await Photo.create({
            title,
            image,
            userName,
            userId
        });

        return photo;
    }

    async remove(id: string): Promise<void> {
        await Photo.findByIdAndDelete(id);
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