import { IAPIErrorResponse } from "../../../interfaces/IAPIErrorResponse";

export interface ICommentResponse extends Partial<IAPIErrorResponse> {
  comment: {
    userId: string;
    comment: string;
    userImage?: string | null;
    userName: string;
  };
  message: string;
}
