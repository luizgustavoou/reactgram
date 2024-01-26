import { IAPIErrorResponse } from "../../interfaces/IAPIErrorResponse";
import { IDeletePhoto } from "../../interfaces/IDeletePhoto";
import { IGetPhotoById } from "../../interfaces/IGetPhotoById";
import { IGetPhotosByUserId } from "../../interfaces/IGetPhotosByUserId";
import { ILikePhoto } from "../../interfaces/ILikePhoto";
import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { IUpdatePhoto } from "../../interfaces/IUpdatePhoto";
import { baseURL, requestConfig } from "../../utils/config";
import { IPhotoResponse } from "./models/IPhotoResponse";

export interface IPhotoApi {
  publishPhoto(
    data: IPublishPhoto,
    token: string
  ): Promise<{ newPhoto: IPhotoResponse }>;

  getPhotoById(
    data: IGetPhotoById,
    token: string
  ): Promise<{ photo: IPhotoResponse }>;

  getPhotosByUserId(
    data: IGetPhotosByUserId,
    token: string
  ): Promise<{ photos: IPhotoResponse[] }>;

  //TODO: Criar uma interface em arquivo separado. (Ver como nomear o arquivo e a interface também)
  deletePhoto(
    data: IDeletePhoto,
    token: string
  ): Promise<{ id: string; message: string }>;

  updatePhoto(
    data: IUpdatePhoto,
    token: string
  ): Promise<{ photo: IPhotoResponse }>;

  likePhoto(
    data: ILikePhoto,
    token: string
  ): Promise<{ photoId: string; userId: string; message: string }>;
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

    const json: { newPhoto: IPhotoResponse } | IAPIErrorResponse =
      await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }
  async getPhotoById(
    data: IGetPhotoById,
    token: string
  ): Promise<{ photo: IPhotoResponse }> {
    const { id } = data;

    const config = requestConfig("GET", null, token);

    const res = await fetch(`${baseURL}/api/photos/${id}`, config);

    const json: { photo: IPhotoResponse } | IAPIErrorResponse =
      await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }

  async getPhotosByUserId(
    data: IGetPhotosByUserId,
    token: string
  ): Promise<{ photos: IPhotoResponse[] }> {
    const { id } = data;

    const config = requestConfig("GET", null, token);

    const res = await fetch(`${baseURL}/api/photos/user/${id}`, config);

    const json: { photos: IPhotoResponse[] } | IAPIErrorResponse =
      await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }

  async deletePhoto(
    data: IDeletePhoto,
    token: string
  ): Promise<{ id: string; message: string }> {
    const { id } = data;

    const config = requestConfig("DELETE", null, token);

    const res = await fetch(`${baseURL}/api/photos/${id}`, config);

    const json: { id: string; message: string } | IAPIErrorResponse =
      await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }

  async updatePhoto(
    data: IUpdatePhoto,
    token: string
  ): Promise<{ photo: IPhotoResponse }> {
    const { id, title } = data;

    const config = requestConfig("PUT", { title }, token);

    const res = await fetch(`${baseURL}/api/photos/${id}`, config);

    const json: { photo: IPhotoResponse } | IAPIErrorResponse =
      await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }

  async likePhoto(
    data: ILikePhoto,
    token: string
  ): Promise<{ photoId: string; userId: string; message: string }> {
    const { photoId } = data;

    const config = requestConfig("PUT", null, token);

    const res = await fetch(`${baseURL}/photos/like/${photoId}`, config);

    const json:
      | { photoId: string; userId: string; message: string }
      | IAPIErrorResponse = await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }
}
