//ler: https://kentcdodds.com/blog/using-fetch-with-type-script

import { IAuthRegister } from "../interfaces/IAuthRegister";
import { IAuthRegisterJSONResponse } from "../interfaces/IAuthRegisterResponse";
import { api, requestConfig } from "../utils/config";

export interface AuthApi {
    register(data: IAuthRegister): Promise<any>
}

export class AuthApiImpl implements AuthApi {
    async register(data: IAuthRegister): Promise<any> {
        const config = requestConfig("POST", data);

        const res = await fetch(api + "/users/register", config);

        const json: IAuthRegisterJSONResponse = await res.json();

        if (res.ok) {
            return json;
        } else {

        }
    }

}