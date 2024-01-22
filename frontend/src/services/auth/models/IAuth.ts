import { IAPIErrorResponse } from "../../../interfaces/IAPIErrorResponse";

export interface IAuth extends Partial<IAPIErrorResponse> {
  _id?: string;
  token?: string;
}
