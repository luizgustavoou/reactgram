import { requestConfig, url } from "../../utils/config";
import { IUserGetProfileJSONResponse } from "./IUserGetProfileJSONResponse";

export interface UserApi {
    getProfile(token: string): Promise<IUserGetProfileJSONResponse>;
}

export class UserApiImpl implements UserApi {
    async getProfile(token: string): Promise<IUserGetProfileJSONResponse> {
        const config = requestConfig("GET", null, token);

        const res = await fetch(url + "/auth/profile", config);

        const json: IUserGetProfileJSONResponse = await res.json();

        return json;
    }

}