import { requestConfig, url } from "../../utils/config";
import { IUserGetProfileJSONResponse } from "./IUserGetProfileJSONResponse";

export interface UserApi {
    getProfile(): Promise<IUserGetProfileJSONResponse>;
}

export class UserApiImpl implements UserApi {
    async getProfile(): Promise<IUserGetProfileJSONResponse> {
        const config = requestConfig("GET", null);

        const res = await fetch(url + "/auth/profile", config);

        const json: IUserGetProfileJSONResponse = await res.json();

        return json;
    }

}