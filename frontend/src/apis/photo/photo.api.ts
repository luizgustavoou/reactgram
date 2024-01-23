import { IGetPhotosByUserId } from "../../interfaces/IGetPhotosByUserId";
import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { baseURL, requestConfig } from "../../utils/config";
import { IPhotoResponse } from "./models/IPhotoResponse";

export interface IPhotoApi {
  publishPhoto(
    data: IPublishPhoto,
    token: string
  ): Promise<{ newPhoto: IPhotoResponse}>;

  getPhotosByUserId(
    data: IGetPhotosByUserId,
    token: string
  ): Promise<{ photos: IPhotoResponse[] }>;
}

export class PhotoApiImpl implements IPhotoApi {
  async publishPhoto(
    data: IPublishPhoto,
    token: string
  ): Promise<{ newPhoto: IPhotoResponse }> {
    const formData = new FormData();

    // TODO: Refatorar código pois está sendo usado também no user.api.ts
    // TODO: Verificar se é responsabilidade da classe api fazer essa conversão de objeto para formData
    Object.keys(data).forEach((key) => formData.append(key, (<any>data)[key]));

    const config = requestConfig("POST", formData, token, true);

    const res = await fetch(`${baseURL}/api/photos`, config);

    const json: { newPhoto: IPhotoResponse } = await res.json();

    return json;
  }

  async getPhotosByUserId(
    data: IGetPhotosByUserId,
    token: string
  ): Promise<{ photos: IPhotoResponse[] }> {
    const { id } = data;

    const config = requestConfig("GET", null, token);

    const res = await fetch(`${baseURL}/api/photos/user/${id}`, config);

    const json: { photos: IPhotoResponse[] } = await res.json();

    return json;
  }
}
