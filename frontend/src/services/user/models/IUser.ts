import { IAPIErrorResponse } from "../../../interfaces/IAPIErrorResponse";

export interface IUser extends Partial<IAPIErrorResponse> {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profileImage: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
