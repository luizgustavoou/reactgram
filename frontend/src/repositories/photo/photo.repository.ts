import { IPhoto } from "../../services/photo/models/IPhoto";

export interface IPhotoRepository {
  publishPhoto(image: Blob, title: string): Promise<IPhoto>;
}

export class PhotoRepositoryImpl implements IPhotoRepository {
    publishPhoto(image: Blob, title: string): Promise<IPhoto> {
        throw new Error("Method not implemented.");
    }
}
