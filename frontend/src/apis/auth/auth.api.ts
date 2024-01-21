//ler: https://kentcdodds.com/blog/using-fetch-with-type-script

import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { IAuthRegisterJSONResponse } from "./IAuthRegisterJSONResponse";
import { requestConfig, baseURL } from "../../utils/config";
import { IAuthLoginJSONResponse } from "./IAuthLoginJSONResponse";
import { IAuthLogin } from "../../interfaces/IAuthLogin";

export interface AuthApi {
    register(data: IAuthRegister): Promise<IAuthRegisterJSONResponse>
    login(data: IAuthLogin): Promise<IAuthLoginJSONResponse>;
}

export class AuthApiImpl implements AuthApi {
    async login(data: IAuthLogin): Promise<IAuthLoginJSONResponse> {
        const config = requestConfig("POST", data);

        const res = await fetch(baseURL + "/auth/signin", config);

        const json: IAuthLoginJSONResponse = await res.json();

        return json;
    }

    async register(data: IAuthRegister): Promise<IAuthRegisterJSONResponse> {
        const config = requestConfig("POST", data);

        const res = await fetch(baseURL + "/auth/signup", config);

        const json: IAuthRegisterJSONResponse = await res.json();

        return json;
    }

}