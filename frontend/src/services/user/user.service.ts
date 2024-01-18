import { IUserGetProfileResponse } from "../../repositories/user/IUserGetProfileResponse";
import { UserRepository } from '../../repositories/user/user.repository';

export interface UserService {
    getProfile(token: string): Promise<IUserGetProfileResponse>;
}

export class UserServiceImpl implements UserService {
    constructor(private userRepository: UserRepository) { }

    async getProfile(token: string): Promise<IUserGetProfileResponse> {
        try {
            const res = await this.userRepository.getProfile(token);
            return res;

        } catch (error) {
            throw new Error("Houve algum erro no servidor.");
        }

    }

}