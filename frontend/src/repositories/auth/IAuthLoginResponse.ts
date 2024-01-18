import { IAPIErrorResponse } from "../../interfaces/IAPIErrorResponse";

export interface IAuthLoginResponse extends Partial<IAPIErrorResponse> {
    "_id"?: string,
    token?: string,
}

