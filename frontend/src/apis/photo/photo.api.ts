import { IPhotoResponse } from "./models/IPhotoResponse";

export interface IPhotoApi {
  publishPhoto(image: Blob, title: string): Promise<IPhotoResponse>;
}

export class PhotoApiImpl implements IPhotoApi {
  publishPhoto(image: Blob, title: string): Promise<IPhotoResponse> {
    throw new Error("Method not implemented.");
  }
}
