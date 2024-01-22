import { IPublishPhotoJSONResponse } from "./IPublishPhotoJSONResponse";

export interface IPhotoApi {
    publishPhoto(image: Blob, title: string): Promise<IPublishPhotoJSONResponse>;
}

export class PhotoApiImpl implements IPhotoApi {
    publishPhoto(image: Blob, title: string): Promise<IPublishPhotoJSONResponse> {
        throw new Error("Method not implemented.");
    }

}