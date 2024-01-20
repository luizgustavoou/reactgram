import { IUser, IUserDoc, User } from "../../user.model";
import { UserRepository } from "../user.repository";

export class MongoUserRepositoryImpl implements UserRepository {
  async create(
    name: string,
    email: string,
    password: string
  ): Promise<IUserDoc> {
    const user = await User.create({
      name,
      email,
      password,
    });

    return user;
  }

  async update(
    id: string,
    updateUserDto: Partial<IUser>
  ): Promise<IUserDoc | null> {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { ...updateUserDto },
      { new: true }
    );

    return user;
  }

  async findOneByEmail(email: string): Promise<IUserDoc | null> {
    const user = await User.findOne({ email });

    return user;
  }
  async findOneById(id: string): Promise<IUserDoc | null> {
    const user = await User.findById(id);

    return user;
  }

  async findMany(): Promise<IUserDoc[]> {
    const users = await User.find({});

    return users;
  }
}
