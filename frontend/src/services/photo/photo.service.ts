import { IPhoto } from "./models/IPhoto";

export interface IPhotoService {
  publishPhoto(image: Blob, title: string): Promise<IPhoto>;
}

export class PhotoServiceImpl implements IPhotoService {
    publishPhoto(image: Blob, title: string): Promise<IPhoto> {
        throw new Error("Method not implemented.");
    }
}
