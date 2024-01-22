import { IAPIErrorResponse } from "../../../interfaces/IAPIErrorResponse";

export interface ILikeResponse extends Partial<IAPIErrorResponse> {
  photoId: string;
  userId: string;
  message: string;
}
