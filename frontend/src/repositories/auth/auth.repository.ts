import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { AuthApi } from '../../apis/auth/auth.api';
import { IAuthRegisterResponse } from './IAuthRegisterResponse';
import { IAuthLoginResponse } from "./IAuthLoginResponse";
import { IAuthLogin } from "../../interfaces/IAuthLogin";

export interface AuthRepository {
    register(data: IAuthRegister): Promise<IAuthRegisterResponse>
    login(data: IAuthLogin): Promise<IAuthLoginResponse>
}

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private authApi: AuthApi) { }
    async login(data: IAuthLogin): Promise<IAuthLoginResponse> {
        const res = await this.authApi.login(data);

        const newResp: IAuthLoginResponse = {
            _id: res._id,
            token: res.token,
            errors: res.errors
        };

        return newResp;
    }

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
