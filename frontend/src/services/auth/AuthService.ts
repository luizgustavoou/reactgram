import { IAuthRegister } from "../../interfaces/IAuthRegister";
import { AuthRepository } from '../../repositories/auth/AuthRepository';
import { IAuthRegisterResponse } from "../../repositories/auth/IAuthRegisterResponse";
import { LocalStorageImpl } from "../storage";


export interface AuthService {
    register(data: IAuthRegister): Promise<IAuthRegisterResponse>
}


export class AuthServiceImpl implements AuthService {
    constructor(private authRepository: AuthRepository, private storage: LocalStorageImpl) { }

    async register(data: IAuthRegister): Promise<IAuthRegisterResponse> {
        try {
            const res = await this.authRepository.register(data);


            if (res) {
                this.storage.setItem("user", JSON.stringify(res));
            }

            return res;
        } catch (error) {
            throw new Error("Houve algum erro no servidor.");
        }

    }
}