import { requestConfig, uploads, url } from "../../utils/config";
import { IUserGetProfileJSONResponse } from "./IUserGetProfileJSONResponse";

export interface UserApi {
  getProfile(token: string): Promise<IUserGetProfileJSONResponse>;

  getProfileImage(name: string): Promise<Blob>;
}

export class UserApiImpl implements UserApi {
  async getProfile(token: string): Promise<IUserGetProfileJSONResponse> {
    const config = requestConfig("GET", null, token);

    const res = await fetch(url + "/auth/profile", config);

    const json: IUserGetProfileJSONResponse = await res.json();

    return json;
  }

  async getProfileImage(name: string): Promise<Blob> {
    const config = requestConfig("GET", null);

    const res = await fetch(`${uploads}/users/${name}`, config);

    const blob = await res.blob();

    return blob;
  }
}
