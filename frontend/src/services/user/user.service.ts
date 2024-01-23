import { IUserUpdateProfile } from "../../interfaces/IUserUpdateProfile";
import { UserRepository } from "../../repositories/user/user.repository";
import { IUser } from "./models/IUser";

export interface UserService {
  getProfileByToken(token: string): Promise<IUser>;

  getProfileById(id: string, token: string): Promise<IUser>;

  getProfileImage(name: string): Promise<Blob>;

  updateProfile(data: IUserUpdateProfile, token: string): Promise<IUser>;
}

export class UserServiceImpl implements UserService {
  constructor(private userRepository: UserRepository) {}

  async getProfileByToken(token: string): Promise<IUser> {
    try {
      const res = await this.userRepository.getProfileByToken(token);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getProfileById(id: string, token: string): Promise<IUser> {
    try {
      const res = await this.userRepository.getProfileById(id, token);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getProfileImage(name: string): Promise<Blob> {
    try {
      const blob = await this.userRepository.getProfileImage(name);

      return blob;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data: IUserUpdateProfile, token: string): Promise<IUser> {
    try {
      const res = await this.userRepository.updateProfile(data, token);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
