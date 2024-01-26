import { IPhotoApi } from "../../apis/photo/photo.api";
import { ICommentPhoto } from "../../interfaces/ICommentPhoto";
import { IDeletePhoto } from "../../interfaces/IDeletePhoto";
import { IGetPhotoById } from "../../interfaces/IGetPhotoById";
import { IGetPhotosByUserId } from "../../interfaces/IGetPhotosByUserId";
import { ILikePhoto } from "../../interfaces/ILikePhoto";
import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { IUpdatePhoto } from "../../interfaces/IUpdatePhoto";
import { IComment } from "../../services/photo/models/IComment";
import { IPhoto } from "../../services/photo/models/IPhoto";

export interface IPhotoRepository {
  publishPhoto(data: IPublishPhoto, token: string): Promise<IPhoto>;

  getPhotoById(data: IGetPhotoById, token: string): Promise<IPhoto>;

  getPhotosByUserId(data: IGetPhotosByUserId, token: string): Promise<IPhoto[]>;

  deletePhoto(
    data: IDeletePhoto,
    token: string
  ): Promise<{ id: string; message: string }>;

  updatePhoto(data: IUpdatePhoto, token: string): Promise<IPhoto>;

  likePhoto(
    data: ILikePhoto,
    token: string
  ): Promise<{ photoId: string; userId: string; message: string }>;

  commentPhoto(data: ICommentPhoto, token: string): Promise<IComment>;
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
      userId: newPhoto.userId,
      createdAt: newPhoto.createdAt,
      updateAt: newPhoto.updateAt,
    };

    return newRes;
  }

  async getPhotoById(data: IGetPhotoById, token: string): Promise<IPhoto> {
    const { photo } = await this.photoApi.getPhotoById(data, token);

    const newRes: IPhoto = {
      _id: photo._id,
      image: photo.image,
      title: photo.title,
      likes: photo.likes,
      comments: photo.comments,
      userName: photo.userName,
      userId: photo.userId,
      createdAt: photo.createdAt,
      updateAt: photo.updateAt,
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
      userId: photoResponse.userId,
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
      userId: photo.userId,
      createdAt: photo.createdAt,
      updateAt: photo.updateAt,
    };

    return newRes;
  }

  async likePhoto(
    data: ILikePhoto,
    token: string
  ): Promise<{ photoId: string; userId: string; message: string }> {
    const res = await this.photoApi.likePhoto(data, token);

    return res;
  }

  async commentPhoto(data: ICommentPhoto, token: string): Promise<IComment> {
    const { comment } = await this.photoApi.commentPhoto(data, token);

    const newRes: IComment = {
      userId: comment.userId,
      userName: comment.userName,
      userImage: comment.userImage,
      comment: comment.comment,
    };

    return newRes;
  }
}
