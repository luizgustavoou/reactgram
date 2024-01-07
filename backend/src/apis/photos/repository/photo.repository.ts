import { IPhotoDoc } from "../photo.model";

export interface PhotoRepository {
    create(title: string, image: string): Promise<IPhotoDoc>

    findOneById(id: string): Promise<IPhotoDoc | null>;

    findMany(): Promise<IPhotoDoc[]>;
}