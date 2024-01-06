import { IUser } from "../user.model";

export type UpdateUserDto = Omit<Partial<IUser>, "email">;

