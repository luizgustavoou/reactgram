import { IAPIErrorResponse } from "../../../interfaces/IAPIErrorResponse";
import { IComment } from "./IComment";
import { ILike } from "./ILike";

export interface IPhoto extends Partial<IAPIErrorResponse> {
  _id: string;
  image: string;
  title: string;
  likes: ILike[];
  comments: IComment[];
  userName: string;
  createdAt: string;
  updateAt: string;
}
