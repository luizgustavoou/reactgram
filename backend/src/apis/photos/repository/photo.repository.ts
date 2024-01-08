import { IPhotoDoc } from "../photo.model";

export interface PhotoRepository {
    create(title: string, image: string, userName: string, userId: string): Promise<IPhotoDoc>

    remove(id: string): Promise<void>;

    
    findOneById(id: string): Promise<IPhotoDoc | null>;
    
    findMany(): Promise<IPhotoDoc[]>;
    
    findManyByUserId(userId: string): Promise<IPhotoDoc[]>;


}