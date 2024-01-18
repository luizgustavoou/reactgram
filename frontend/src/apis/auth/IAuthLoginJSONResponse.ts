import { IAPIErrorResponse } from "../../interfaces/IAPIErrorResponse";

export interface IAuthLoginJSONResponse extends Partial<IAPIErrorResponse> {
    "_id"?: string,
    token?: string,
}


