import { IAPIErrorResponse } from "../../interfaces/IAPIErrorResponse";

export interface IAuthRegisterResponse extends Partial<IAPIErrorResponse> {
    "_id"?: string,
    token?: string,
}