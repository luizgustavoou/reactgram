import { IAuthRegister } from "../interfaces/IAuthRegister";
import { AuthApi } from '../apis/AuthApi';

export interface AuthRepository {
    register(data: IAuthRegister): Promise<any>
}

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private authApi: AuthApi) { }

    async register(data: IAuthRegister): Promise<any> {
        const res = await this.authApi.register(data);

        return res;
    }

}
