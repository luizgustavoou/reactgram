import { IDeletePhoto } from "../../interfaces/IDeletePhoto";
import { IGetPhotosByUserId } from "../../interfaces/IGetPhotosByUserId";
import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { IUpdatePhoto } from "../../interfaces/IUpdatePhoto";
import { IPhotoRepository } from "../../repositories/photo/photo.repository";
import { IPhoto } from "./models/IPhoto";

export interface IPhotoService {
  publishPhoto(data: IPublishPhoto, token: string): Promise<IPhoto>;

  getPhotosByUserId(data: IGetPhotosByUserId, token: string): Promise<IPhoto[]>;

  deletePhoto(
    data: IDeletePhoto,
    token: string
  ): Promise<{ id: string; message: string }>;

  updatePhoto(data: IUpdatePhoto, token: string): Promise<IPhoto>;
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
}
