import { UserRepository } from './repository/user.repository';
import { IUserDoc } from "./user.model";

export interface UserService {
    findOneByEmail(email: string): Promise<IUserDoc | null>;

    findOneById(id: string): Promise<IUserDoc | null>;

    create(name: string, email: string, password: string): Promise<IUserDoc | null>;
}

export class UserServiceImpl implements UserService {
    constructor(private userRepository: UserRepository) { }
    findOneById(id: string): Promise<IUserDoc | null> {
        const user = this.userRepository.findOneById(id);

        return user;
    }

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