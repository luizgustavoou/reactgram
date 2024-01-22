import { IUserUpdateProfile } from "../../interfaces/IUserUpdateProfile";
import { requestConfig, uploadsURL, baseURL } from "../../utils/config";
import { IUserGetProfileByIdJSONResponse } from "./IUserGetProfileByIdJSONResponse";
import { IUserGetProfileByTokenJSONResponse } from "./IUserGetProfileByTokenJSONResponse";
import { IUserUpdateProfileJSONResponse } from "./IUserUpdateProfileJSONResponse";

export interface UserApi {
  getProfileByToken(token: string): Promise<IUserGetProfileByTokenJSONResponse>;

  getProfileById(id: string, token: string): Promise<IUserGetProfileByIdJSONResponse>;

  getProfileImage(name: string): Promise<Blob>;

  updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserUpdateProfileJSONResponse>;
}

export class UserApiImpl implements UserApi {
  async getProfileByToken(token: string): Promise<IUserGetProfileByTokenJSONResponse> {
    const config = requestConfig("GET", null, token);

    const res = await fetch(baseURL + "/auth/profile", config);

    const json: IUserGetProfileByIdJSONResponse = await res.json();

    return json;
  }

  async getProfileById(id: string, token: string): Promise<IUserGetProfileByIdJSONResponse> {
    const config = requestConfig("GET", null, token);

    const res = await fetch(baseURL + `/api/users/${id}`, config);

    const json: IUserGetProfileByIdJSONResponse = await res.json();

    return json;
  }

  async getProfileImage(name: string): Promise<Blob> {
    const config = requestConfig("GET", null);

    const res = await fetch(`${uploadsURL}/users/${name}`, config);

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

    const res = await fetch(`${baseURL}/api/users`, config);

    const json: IUserUpdateProfileJSONResponse = await res.json();

    return json;
  }
}
