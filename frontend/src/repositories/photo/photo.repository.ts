import { IPhotoApi } from "../../apis/photo/photo.api";
import { IPublishPhoto } from "../../interfaces/IPublishPhoto";
import { IPhoto } from "../../services/photo/models/IPhoto";

export interface IPhotoRepository {
  publishPhoto(data: IPublishPhoto, token: string): Promise<IPhoto>;
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
}
