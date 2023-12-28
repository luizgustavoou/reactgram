import { IUserDoc, User } from "../../user.model";
import { UserRepository } from "../user.repository";

export class MongoUserRepositoryImpl implements UserRepository {
    async create(name: string, email: string, password: string): Promise<IUserDoc> {
        const user = await User.create({
            name,
            email,
            password
        });

        return user;
    }
    async findOneByEmail(email: string): Promise<IUserDoc | null> {
        const user = await User.findOne({ email });

        return user;
    }
    async findOneById(id: string): Promise<IUserDoc | null> {
        const user = await User.findOne({ id });

        return user;
    }

}