import { IAPIErrorResponse } from "../../interfaces/IAPIErrorResponse";
import { IUserUpdateProfile } from "../../interfaces/IUserUpdateProfile";
import { requestConfig, uploadsURL, baseURL } from "../../utils/config";
import { IUserResponse } from "./models/IUserResponse";

export interface IUserApi {
  getProfileByToken(token: string): Promise<IUserResponse>;

  getProfileById(id: string, token: string): Promise<IUserResponse>;

  getProfileImage(name: string): Promise<Blob>;

  updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserResponse>;
}

export class UserApiImpl implements IUserApi {
  async getProfileByToken(token: string): Promise<IUserResponse> {
    const config = requestConfig("GET", null, token);

    const res = await fetch(baseURL + "/auth/profile", config);

    const json: IUserResponse | IAPIErrorResponse = await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }

  async getProfileById(id: string, token: string): Promise<IUserResponse> {
    const config = requestConfig("GET", null, token);

    const res = await fetch(baseURL + `/api/users/${id}`, config);

    const json: IUserResponse | IAPIErrorResponse = await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

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
  ): Promise<IUserResponse> {
    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, (<any>data)[key]));

    const config = requestConfig("PUT", formData, token, true);

    const res = await fetch(`${baseURL}/api/users`, config);

    const json: IUserResponse | IAPIErrorResponse = await res.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  }
}
