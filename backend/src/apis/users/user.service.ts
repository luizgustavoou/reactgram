import { UserRepository } from './repository/user.repository';
import { IUserDoc } from "./user.model";

export interface UserService {
    create(name: string, email: string, password: string): Promise<IUserDoc | null>;

    findOneByEmail(email: string): Promise<IUserDoc | null>;

    findOneById(id: string): Promise<IUserDoc | null>;

    findMany(): Promise<IUserDoc[]>;

}

export class UserServiceImpl implements UserService {
    constructor(private userRepository: UserRepository) { }

    async create(name: string, email: string, password: string) {
        const newUser = await this.userRepository.create(
            name,
            email,
            password
        );

        return newUser;
    }

    async findOneById(id: string): Promise<IUserDoc | null> {
        const user = await this.userRepository.findOneById(id);

        return user;
    }

    async findOneByEmail(email: string) {
        const user = await this.userRepository.findOneByEmail(email);

        return user;
    }

    async findMany(): Promise<IUserDoc[]> {
        const users = await this.userRepository.findMany();

        return users;
    }



}