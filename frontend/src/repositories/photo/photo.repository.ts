import { IPhotoApi } from "../../apis/photo/photo.api";
import { IDeletePhoto } from "../../interfaces/IDeletePhoto";
import { IGetPhotosByUserId } from "../../interfaces/IGetPhotosByUserId";
import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { IUpdatePhoto } from "../../interfaces/IUpdatePhoto";
import { IPhoto } from "../../services/photo/models/IPhoto";

export interface IPhotoRepository {
  publishPhoto(data: IPublishPhoto, token: string): Promise<IPhoto>;

  getPhotosByUserId(data: IGetPhotosByUserId, token: string): Promise<IPhoto[]>;

  deletePhoto(
    data: IDeletePhoto,
    token: string
  ): Promise<{ id: string; message: string }>;

  updatePhoto(data: IUpdatePhoto, token: string): Promise<IPhoto>;
}

export class PhotoRepositoryImpl implements IPhotoRepository {
  constructor(private photoApi: IPhotoApi) {}

  async publishPhoto(data: IPublishPhoto, token: string): Promise<IPhoto> {
    const { newPhoto } = await this.photoApi.publishPhoto(data, token);

    const newRes: IPhoto = {
      _id: newPhoto._id,
      image: newPhoto.image,
      title: newPhoto.title,
      likes: newPhoto.likes,
      comments: newPhoto.comments,
      userName: newPhoto.userName,
      createdAt: newPhoto.createdAt,
      updateAt: newPhoto.updateAt,
    };

    return newRes;
  }

  async getPhotosByUserId(
    data: IGetPhotosByUserId,
    token: string
  ): Promise<IPhoto[]> {
    const res = await this.photoApi.getPhotosByUserId(data, token);

    const { photos } = res;

    const newRes: IPhoto[] = photos.map((photoResponse) => ({
      _id: photoResponse._id,
      image: photoResponse.image,
      title: photoResponse.title,
      likes: photoResponse.likes,
      comments: photoResponse.comments,
      userName: photoResponse.userName,
      createdAt: photoResponse.createdAt,
      updateAt: photoResponse.updateAt,
    }));

    return newRes;
  }
  async deletePhoto(
    data: IDeletePhoto,
    token: string
  ): Promise<{ id: string; message: string }> {
    const res = await this.photoApi.deletePhoto(data, token);

    return res;
  }

  async updatePhoto(data: IUpdatePhoto, token: string): Promise<IPhoto> {
    const { photo } = await this.photoApi.updatePhoto(data, token);

    const newRes: IPhoto = {
      _id: photo._id,
      image: photo.image,
      title: photo.title,
      likes: photo.likes,
      comments: photo.comments,
      userName: photo.userName,
      createdAt: photo.createdAt,
      updateAt: photo.updateAt,
    };

    return newRes;
  }
}
