//ler: https://kentcdodds.com/blog/using-fetch-with-type-script

import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { requestConfig, baseURL } from "../../utils/config";
import { IAuthLogin } from "../../interfaces/IAuthLogin";
import { IAuthResponse } from "./models/IAuthResponse";

export interface AuthApi {
  register(data: IAuthRegister): Promise<IAuthResponse>;
  login(data: IAuthLogin): Promise<IAuthResponse>;
}

export class AuthApiImpl implements AuthApi {
  async login(data: IAuthLogin): Promise<IAuthResponse> {
    const config = requestConfig("POST", data);

    const res = await fetch(baseURL + "/auth/signin", config);

    const json: IAuthResponse = await res.json();

    return json;
  }

  async register(data: IAuthRegister): Promise<IAuthResponse> {
    const config = requestConfig("POST", data);

    const res = await fetch(baseURL + "/auth/signup", config);

    const json: IAuthResponse = await res.json();

    return json;
  }
}
