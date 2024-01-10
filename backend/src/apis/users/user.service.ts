import { NotFoundError } from '../../exceptions/NotFoundError';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { UserRepository } from './repository/user.repository';
import { IUserDoc } from "./user.model";
import { BcryptService } from '../../helpers/bcrypt/bcrypt.service';
import { InternalServerError } from '../../exceptions/InternalServerError';

export interface IUserService {
    create(name: string, email: string, password: string): Promise<IUserDoc>;

    update(id: string, updateUserDto: UpdateUserDto): Promise<IUserDoc>;

    findOneByEmail(email: string): Promise<IUserDoc | null>;

    findOneById(id: string): Promise<IUserDoc>;

    findMany(): Promise<IUserDoc[]>;

}

export class UserServiceImpl implements IUserService {
    constructor(private userRepository: UserRepository, private bcryptService: BcryptService) { }

    async create(name: string, email: string, password: string) {
        const newUser = await this.userRepository.create(
            name,
            email,
            password
        );

        if (!newUser) {
            throw new InternalServerError(new Error("Erro ao criar usuário."), "Ocorreu algum erro interno no servidor. Por favor, tente novamente mais tarde.");
        }

        return newUser;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<IUserDoc> {
        const update = { ...updateUserDto };

        if (updateUserDto.password) {
            const passwordHash = await this.bcryptService.generateHash(updateUserDto.password);

            update.password = passwordHash;
        }

        const user = await this.userRepository.update(id, update);

        if (!user) {
            throw new NotFoundError("Usuário não encontrado.");
        }

        return user;
    }

    async findOneById(id: string): Promise<IUserDoc> {
        const user = await this.userRepository.findOneById(id);

        if (!user) {
            throw new NotFoundError("Usuário não encontrado.");
        }

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