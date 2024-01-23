import { IGetPhotosByUserId } from "../../interfaces/IGetPhotosByUserId";
import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { IPhotoRepository } from "../../repositories/photo/photo.repository";
import { IPhoto } from "./models/IPhoto";

export interface IPhotoService {
  publishPhoto(data: IPublishPhoto, token: string): Promise<IPhoto>;

  getPhotosByUserId(data: IGetPhotosByUserId, token: string): Promise<IPhoto[]>;
}

export class PhotoServiceImpl implements IPhotoService {
  constructor(private photoRepository: IPhotoRepository) {}

  publishPhoto(data: IPublishPhoto, token: string): Promise<IPhoto> {
    try {
      const res = this.photoRepository.publishPhoto(data, token);

      return res;
    } catch (error) {
      throw new Error("Houve algum erro no servidor.");
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
      throw new Error("Houve algum erro no servidor.");
    }
  }
}
