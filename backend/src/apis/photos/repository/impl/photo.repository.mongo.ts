import { IPhotoDoc, Photo } from '../../photo.model';
import { PhotoRepository } from "../photo.repository";
import { IUpdatePhotoDto } from '../../dtos/UpdatePhotoDto';

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

    async update(id: string, updatePhotoDto: IUpdatePhotoDto): Promise<IPhotoDoc | null> {
        const photo = await Photo.findOneAndUpdate({ _id: id }, { ...updatePhotoDto }, { new: true });

        return photo;
    }


    async remove(id: string): Promise<void> {
        await Photo.findByIdAndDelete(id).exec();
    }

    async findOneById(id: string): Promise<IPhotoDoc | null> {
        const photo = await Photo.findById(id).exec();

        return photo;
    }

    async findMany(): Promise<IPhotoDoc[]> {
        const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();

        return photos;
    }


    async findManyByUserId(userId: string): Promise<IPhotoDoc[]> {
        const photos = await Photo.find({ userId }).sort([["createdAt", -1]]).exec();

        return photos;
    }

}