import { IComment } from "./IComment";
import { ILike } from "./ILike";

export interface IPhoto {
  _id: string;
  image: string;
  title: string;
  likes: ILike[];
  comments: IComment[];
  userName: string;
  userId: string;
  createdAt: string;
  updateAt: string;
}
