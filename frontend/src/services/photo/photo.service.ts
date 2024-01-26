import { IDeletePhoto } from "../../interfaces/IDeletePhoto";
import { IGetPhotoById } from "../../interfaces/IGetPhotoById";
import { IGetPhotosByUserId } from "../../interfaces/IGetPhotosByUserId";
import { ILikePhoto } from "../../interfaces/ILikePhoto";
import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { IUpdatePhoto } from "../../interfaces/IUpdatePhoto";
import { IPhotoRepository } from "../../repositories/photo/photo.repository";
import { IPhoto } from "./models/IPhoto";

export interface IPhotoService {
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
}

export class PhotoServiceImpl implements IPhotoService {
  constructor(private photoRepository: IPhotoRepository) {}

  publishPhoto(data: IPublishPhoto, token: string): Promise<IPhoto> {
    try {
      const res = this.photoRepository.publishPhoto(data, token);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getPhotoById(data: IGetPhotoById, token: string): Promise<IPhoto> {
    try {
      const res = this.photoRepository.getPhotoById(data, token);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getPhotosByUserId(
    data: IGetPhotosByUserId,
    token: string
  ): Promise<IPhoto[]> {
    try {
      const res = this.photoRepository.getPhotosByUserId(data, token);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async deletePhoto(
    data: IDeletePhoto,
    token: string
  ): Promise<{ id: string; message: string }> {
    try {
      const res = this.photoRepository.deletePhoto(data, token);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async updatePhoto(data: IUpdatePhoto, token: string): Promise<IPhoto> {
    try {
      const res = this.photoRepository.updatePhoto(data, token);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async likePhoto(
    data: ILikePhoto,
    token: string
  ): Promise<{ photoId: string; userId: string; message: string }> {
    try {
      const res = this.photoRepository.likePhoto(data, token);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
