import { IPhotoDoc } from "../photo.model";

export interface PhotoRepository {
    create(title: string, image: string, userName: string, userId: string): Promise<IPhotoDoc>

    findOneById(id: string): Promise<IPhotoDoc | null>;

    findMany(): Promise<IPhotoDoc[]>;
}