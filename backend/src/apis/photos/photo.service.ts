import { IPhotoDoc } from "./photo.model";

export interface PhotoService {
    create(title: string, image: string): Promise<IPhotoDoc | null>;
}

export class PhotoServiceImpl implements PhotoService {
    async create(title: string, image: string): Promise<IPhotoDoc | null> {
        return null;

    }

}