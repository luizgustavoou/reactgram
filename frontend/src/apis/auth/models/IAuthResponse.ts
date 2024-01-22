import { IAPIErrorResponse } from "../../../interfaces/IAPIErrorResponse";

export interface IAuthResponse extends Partial<IAPIErrorResponse> {
  _id?: string;
  token?: string;
}
