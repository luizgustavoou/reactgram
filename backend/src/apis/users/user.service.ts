import { BcryptService } from "../../utils/bcrypt/bcrypt.service";
import { UserRepository } from './repository/user.repository';

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findOneByEmail(email: string) {
        const user = this.userRepository.findOneByEmail(email);

        return user;

    }

    async create(name: string, email: string, password: string) {

        const newUser = await this.userRepository.create(
            name,
            email,
            password
        );

        return newUser;
    }
}