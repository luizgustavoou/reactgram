import { IUserDoc } from '../user.model';

export interface UserRepository {
    create(name: string, email: string, password: string): Promise<IUserDoc>

    findOneByEmail(email: string): Promise<IUserDoc | null>;

    findOneById(id: string): Promise<IUserDoc | null>;

    findMany(): Promise<IUserDoc[]>;
}

