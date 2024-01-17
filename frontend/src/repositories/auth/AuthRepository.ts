import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { AuthApi } from '../../apis/auth/AuthApi';
import { IAuthRegisterResponse } from './IAuthRegisterResponse';

export interface AuthRepository {
    register(data: IAuthRegister): Promise<IAuthRegisterResponse>
}

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private authApi: AuthApi) { }

    async register(data: IAuthRegister): Promise<IAuthRegisterResponse> {
        const res = await this.authApi.register(data);

        const newResp: IAuthRegisterResponse = {
            _id: res._id,
            token: res.token,
            errors: res.errors
        };

        return newResp;
    }
}
