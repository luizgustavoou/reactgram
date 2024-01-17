//ler: https://kentcdodds.com/blog/using-fetch-with-type-script

import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { IAuthRegisterJSONResponse } from "./IAuthRegisterJSONResponse";
import { api, requestConfig, url } from "../../utils/config";

export interface AuthApi {
    register(data: IAuthRegister): Promise<IAuthRegisterJSONResponse>
}

export class AuthApiImpl implements AuthApi {
    async register(data: IAuthRegister): Promise<IAuthRegisterJSONResponse> {
        const config = requestConfig("POST", data);

        const res = await fetch(url + "/auth/signup", config);

        const json: IAuthRegisterJSONResponse = await res.json();

        return json;
    }

}