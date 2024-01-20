import { IUserUpdateProfile } from "../../interfaces/IUserUpdateProfile";
import { IUserGetProfileResponse } from "../../repositories/user/IUserGetProfileResponse";
import { IUserUpdateProfileResponse } from "../../repositories/user/IUserUpdateProfileResponse";
import { UserRepository } from "../../repositories/user/user.repository";

export interface UserService {
  getProfile(token: string): Promise<IUserGetProfileResponse>;

  getProfileImage(name: string): Promise<Blob>;

  updateProfile(
    data: IUserUpdateProfile,
    token: string
  ): Promise<IUserUpdateProfileResponse>;
}

export class UserServiceImpl implements UserService {
  constructor(private userRepository: UserRepository) {}

  async getProfile(token: string): Promise<IUserGetProfileResponse> {
    try {
      const res = await this.userRepository.getProfile(token);
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
      const formData = new FormData();

      const userFormData = Object.keys(data).forEach((key) => {
        formData.append(key, (<any>data)[key]);
      });

      formData.append("user", userFormData);

      console.log(formData);

      console.log(formData.get("user"));

      const res = await this.userRepository.updateProfile(data, token);

      return res;
    } catch (error) {
      throw new Error("Houve algum erro no servidor.");
    }
  }
}
