import { NotFoundError } from '../../exceptions/NotFoundError';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { UserRepository } from './repository/user.repository';
import { IUserDoc } from "./user.model";
import { BcryptService } from '../../utils/bcrypt/bcrypt.service';

export interface UserService {
    create(name: string, email: string, password: string): Promise<IUserDoc | null>;

    findOneAndUpdate(id: string, updateUserDto: UpdateUserDto): Promise<IUserDoc | null>;

    findOneByEmail(email: string): Promise<IUserDoc | null>;

    findOneById(id: string): Promise<IUserDoc | null>;

    findMany(): Promise<IUserDoc[]>;

}

export class UserServiceImpl implements UserService {
    constructor(private userRepository: UserRepository, private bcryptService: BcryptService) { }

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

    async findOneAndUpdate(id: string, updateUserDto: UpdateUserDto): Promise<IUserDoc | null> {
        const update = { ...updateUserDto };

        if (updateUserDto.password) {
            const passwordHash = await this.bcryptService.generateHash(updateUserDto.password);

            update.password = passwordHash;
        }

        const user = await this.userRepository.findOneAndUpdate(id, update);

        return user;
    }



}