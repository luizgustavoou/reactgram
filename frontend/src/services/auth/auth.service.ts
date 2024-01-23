import { IAuthLogin } from "../../interfaces/IAuthLogin";
import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { AuthRepository } from "../../repositories/auth/auth.repository";

import { LocalStorageImpl } from "../storage";
import { IAuth } from "./models/IAuth";

export interface AuthService {
  register(data: IAuthRegister): Promise<IAuth>;

  login(data: IAuthLogin): Promise<IAuth>;

  logout(): void;
}

export class AuthServiceImpl implements AuthService {
  constructor(
    private authRepository: AuthRepository,
    private storage: LocalStorageImpl
  ) {}
  async login(data: IAuthLogin): Promise<IAuth> {
    try {
      const res = await this.authRepository.login(data);

      if (!res.errors) {
        this.storage.setItem("user", JSON.stringify(res));
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  async register(data: IAuthRegister): Promise<IAuth> {
    try {
      const res = await this.authRepository.register(data);

      if (!res.errors) {
        this.storage.setItem("user", JSON.stringify(res));
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.storage.removeItem("user");
  }
}
