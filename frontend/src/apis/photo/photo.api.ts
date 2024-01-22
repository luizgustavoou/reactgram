import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { baseURL, requestConfig } from "../../utils/config";
import { IPhotoResponse } from "./models/IPhotoResponse";

export interface IPhotoApi {
  publishPhoto(data: IPublishPhoto, token: string): Promise<IPhotoResponse>;
}

export class PhotoApiImpl implements IPhotoApi {
  async publishPhoto(
    data: IPublishPhoto,
    token: string
  ): Promise<IPhotoResponse> {
    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, (<any>data)[key]));

    const config = requestConfig("POST", formData, token, true);

    const res = await fetch(`${baseURL}/api/photos`, config);

    const json: IPhotoResponse = await res.json();

    return json;
  }
}
