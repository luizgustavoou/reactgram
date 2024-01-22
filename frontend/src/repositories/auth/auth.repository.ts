import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { AuthApi } from '../../apis/auth/auth.api';

import { IAuthLogin } from "../../interfaces/IAuthLogin";
import { IAuth } from "../../services/auth/models/IAuth";

export interface AuthRepository {
    register(data: IAuthRegister): Promise<IAuth>
    login(data: IAuthLogin): Promise<IAuth>
}

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private authApi: AuthApi) { }
    async login(data: IAuthLogin): Promise<IAuth> {
        const res = await this.authApi.login(data);

        const newResp: IAuth = {
            _id: res._id,
            token: res.token,
            errors: res.errors
        };

        return newResp;
    }

    async register(data: IAuthRegister): Promise<IAuth> {
        const res = await this.authApi.register(data);

        const newResp: IAuth = {
            _id: res._id,
            token: res.token,
            errors: res.errors
        };

        return newResp;
    }
}
