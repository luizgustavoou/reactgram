import { IAPIErrorResponse } from "../../../interfaces/IAPIErrorResponse";

export interface IComment extends Partial<IAPIErrorResponse> {
  userId: string;
  comment: string;
  userName: string;
  userImage?: string | null;
}
