import { IAuthRegister } from "../interfaces/IAuthRegister";
import { AuthRepository } from '../repositories/auth/AuthRepository';
import { IAuthRegisterResponse } from "../repositories/auth/IAuthRegisterResponse";


export interface AuthService {
    register(data: IAuthRegister): Promise<IAuthRegisterResponse>
}


export class AuthServiceImpl implements AuthService {
    constructor(private authRepository: AuthRepository) { }

    async register(data: IAuthRegister): Promise<IAuthRegisterResponse> {
        try {
            const res = await this.authRepository.register(data);


            if (res) {
                localStorage.setItem("user", JSON.stringify(res));
            }

            return res;
        } catch (error) {
            throw new Error("Houve algum erro no servidor.");
        }

    }
}