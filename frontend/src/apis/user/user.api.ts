import { IUserUpdateProfile } from "../../interfaces/IUserUpdateProfile";
import { api, requestConfig, uploads, url } from "../../utils/config";
import { IUserGetProfileJSONResponse } from "./IUserGetProfileJSONResponse";
import { IUserUpdateProfileJSONResponse } from "./IUserUpdateProfileJSONResponse";

export interface UserApi {
  getProfile(token: string): Promise<IUserGetProfileJSONResponse>;

  getProfileImage(name: string): Promise<Blob>;

  updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserUpdateProfileJSONResponse>;
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

  async updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserUpdateProfileJSONResponse> {
    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, (<any>data)[key]));

    const config = requestConfig("PUT", formData, token, true);

    const res = await fetch(`${api}/users`, config);

    const json: IUserUpdateProfileJSONResponse = await res.json();

    return json;
  }
}
