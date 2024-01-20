import { UserApi } from "../../apis/user/user.api";
import { IUserUpdateProfile } from "../../interfaces/IUserUpdateProfile";
import { IUserGetProfileResponse } from "./IUserGetProfileResponse";
import { IUserUpdateProfileResponse } from "./IUserUpdateProfileResponse";

export interface UserRepository {
  getProfile(token: string): Promise<IUserGetProfileResponse>;

  getProfileImage(name: string): Promise<Blob>;

  updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserUpdateProfileResponse>;
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
      errors: res.errors,
    };

    return newRes;
  }

  async getProfileImage(name: string): Promise<Blob> {
    const blob = await this.userApi.getProfileImage(name);

    return blob;
  }

  async updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserUpdateProfileResponse> {
    const res = await this.userApi.updateProfile(data, token);

    const newRes: IUserUpdateProfileResponse = {
      _id: res._id,
      name: res.name,
      email: res.email,
      bio: res.bio,
      profileImage: res.profileImage,
      password: res.password,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      errors: res.errors,
    };

    return newRes;
  }
}
