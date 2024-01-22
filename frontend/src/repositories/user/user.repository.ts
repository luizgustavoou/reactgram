import { UserApi } from "../../apis/user/user.api";
import { IUserUpdateProfile } from "../../interfaces/IUserUpdateProfile";
import { IUser } from "../../services/user/models/IUser";

export interface UserRepository {
  getProfileByToken(token: string): Promise<IUser>;

  getProfileById(id: string, token: string): Promise<IUser>;

  getProfileImage(name: string): Promise<Blob>;

  updateProfile(data: IUserUpdateProfile, token: string): Promise<IUser>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor(private userApi: UserApi) {}

  async getProfileByToken(token: string): Promise<IUser> {
    const res = await this.userApi.getProfileByToken(token);

    const newRes: IUser = {
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

  async getProfileById(id: string, token: string): Promise<IUser> {
    const res = await this.userApi.getProfileById(id, token);

    const newRes: IUser = {
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

  async updateProfile(data: IUserUpdateProfile, token: string): Promise<IUser> {
    const res = await this.userApi.updateProfile(data, token);

    const newRes: IUser = {
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
