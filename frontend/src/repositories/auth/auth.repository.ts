import { IAuthRegister } from "../../interfaces/IAuthRegister";

import { IAuthLogin } from "../../interfaces/IAuthLogin";
import { IAuth } from "../../services/auth/models/IAuth";
import { IAuthApi } from "../../apis/auth/auth.api";

export interface AuthRepository {
  register(data: IAuthRegister): Promise<IAuth>;
  login(data: IAuthLogin): Promise<IAuth>;
}

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private authApi: IAuthApi) {}
  async login(data: IAuthLogin): Promise<IAuth> {
    const res = await this.authApi.login(data);

    const newResp: IAuth = {
      _id: res._id,
      token: res.token,
    };

    return newResp;
  }

  async register(data: IAuthRegister): Promise<IAuth> {
    const res = await this.authApi.register(data);

    const newResp: IAuth = {
      _id: res._id,
      token: res.token,
    };

    return newResp;
  }
}
