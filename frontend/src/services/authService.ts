import { IAuthRegister } from "../interfaces/IAuthRegister";
import { requestConfig, url } from "../utils/config";


export interface AuthService {
    register(data: IAuthRegister): Promise<any>
}


export class AuthServiceImpl implements AuthService {
    async register(data: IAuthRegister): Promise<any> {
        const config = requestConfig("POST", data);

        try {
            const res = await fetch(url + "/auth/signup", config);

            const json = await res.json();

            if (json) {
                localStorage.setItem("user", JSON.stringify(json));
            }
        } catch (error) {
            console.log(error)
        }

    }
}