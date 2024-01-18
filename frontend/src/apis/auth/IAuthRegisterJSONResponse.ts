import { IAPIErrorResponse } from "../../interfaces/IAPIErrorResponse";

export interface IAuthRegisterJSONResponse extends Partial<IAPIErrorResponse> {
    "_id"?: string,
    token?: string,
}

