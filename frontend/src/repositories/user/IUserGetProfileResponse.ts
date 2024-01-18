import { IAPIErrorResponse } from '../../interfaces/IAPIErrorResponse';

export interface IUserGetProfileResponse extends Partial<IAPIErrorResponse> {
    "_id": string,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
}