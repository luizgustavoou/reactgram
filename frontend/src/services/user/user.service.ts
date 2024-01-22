import { IUserUpdateProfile } from "../../interfaces/IUserUpdateProfile";
import { IUserGetProfileByIdResponse } from "../../repositories/user/IUserGetProfileByIdResponse";
import { IUserGetProfileByTokenResponse } from "../../repositories/user/IUserGetProfileByTokenResponse";
import { IUserUpdateProfileResponse } from "../../repositories/user/IUserUpdateProfileResponse";
import { UserRepository } from "../../repositories/user/user.repository";

export interface UserService {
  getProfileByToken(token: string): Promise<IUserGetProfileByTokenResponse>;

  getProfileById(
    id: string,
    token: string
  ): Promise<IUserGetProfileByIdResponse>;

  getProfileImage(name: string): Promise<Blob>;

  updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserUpdateProfileResponse>;
}

export class UserServiceImpl implements UserService {
  constructor(private userRepository: UserRepository) {}

  async getProfileByToken(
    token: string
  ): Promise<IUserGetProfileByTokenResponse> {
    try {
      const res = await this.userRepository.getProfileByToken(token);

      return res;
    } catch (error) {
      throw new Error("Houve algum erro no servidor.");
    }
  }

  async getProfileById(
    id: string,
    token: string
  ): Promise<IUserGetProfileByIdResponse> {
    try {
      const res = await this.userRepository.getProfileById(id, token);
      
      return res;
    } catch (error) {
      throw new Error("Houve algum erro no servidor.");
    }
  }

  async getProfileImage(name: string): Promise<Blob> {
    try {
      const blob = await this.userRepository.getProfileImage(name);

      return blob;
    } catch (error) {
      throw new Error("Houve algum erro no servidor.");
    }
  }

  async updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserUpdateProfileResponse> {
    try {
      const res = await this.userRepository.updateProfile(data, token);

      return res;
    } catch (error) {
      throw new Error("Houve algum erro no servidor.");
    }
  }
}
