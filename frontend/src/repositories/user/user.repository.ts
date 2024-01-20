import { UserApi } from "../../apis/user/user.api";
import { requestConfig, url } from "../../utils/config";
import { IUserGetProfileResponse } from "./IUserGetProfileResponse";

export interface UserRepository {
  getProfile(token: string): Promise<IUserGetProfileResponse>;

  getProfileImage(name: string): Promise<Blob>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor(private userApi: UserApi) {}

  async getProfile(token: string): Promise<IUserGetProfileResponse> {
    const res = await this.userApi.getProfile(token);

    const newRes: IUserGetProfileResponse = {
      _id: res._id,
      name: res.name,
      email: res.email,
      bio: res.bio,
      profileImage: res.profileImage,
      password: res.password,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    };

    return newRes;
  }

  async getProfileImage(name: string): Promise<Blob> {
    const blob = await this.userApi.getProfileImage(name);

    return blob;
  }
}
