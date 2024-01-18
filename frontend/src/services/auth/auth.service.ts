import { IAuthLogin } from "../../interfaces/IAuthLogin";
import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { AuthRepository } from '../../repositories/auth/auth.repository';
import { IAuthRegisterResponse } from "../../repositories/auth/IAuthRegisterResponse";
import { LocalStorageImpl } from "../storage";


export interface AuthService {
    register(data: IAuthRegister): Promise<IAuthRegisterResponse>

    login(data: IAuthLogin): Promise<IAuthRegisterResponse>;

    logout(): void
}


export class AuthServiceImpl implements AuthService {
    constructor(private authRepository: AuthRepository, private storage: LocalStorageImpl) { }
    async login(data: IAuthLogin): Promise<IAuthRegisterResponse> {
        try {
            const res = await this.authRepository.login(data);

            if (!res.errors) {
                this.storage.setItem("user", JSON.stringify(res));
            }

            return res;

        } catch (error) {
            throw new Error("Houve algum erro no servidor.");

        }
    }

    async register(data: IAuthRegister): Promise<IAuthRegisterResponse> {
        try {
            const res = await this.authRepository.register(data);


            if (!res.errors) {
                this.storage.setItem("user", JSON.stringify(res));
            }

            return res;
        } catch (error) {
            throw new Error("Houve algum erro no servidor.");
        }

    }

    logout() {
        this.storage.removeItem("user");
    }


}