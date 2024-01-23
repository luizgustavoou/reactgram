import { IAPIErrorResponse } from "../../../interfaces/IAPIErrorResponse";

export interface IPhotoResponse extends Partial<IAPIErrorResponse> {
  _id: string;
  image: string;
  title: string;
  likes: string[];
  comments: {
    userId: string;
    comment: string;
    userName: string;
    userImage?: string | null;
  }[];
  userName: string;
  createdAt: string;
  updateAt: string;
  __v: number;
}
