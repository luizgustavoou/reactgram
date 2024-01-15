import { IAuthRegister } from "../interfaces/IAuthRegister";
import { api, requestConfig } from "../utils/config";

export interface AuthApi {
    register(data: IAuthRegister): Promise<any>
}

export class AuthApiImpl implements AuthApi {
    async register(data: IAuthRegister): Promise<any> {
        const config = requestConfig("POST", data);

        try {
            const res = await fetch(api + "/users/register", config);

            const json = await res.json();

            return json;
        } catch (error) {
            console.log(error)
        }

    }

}