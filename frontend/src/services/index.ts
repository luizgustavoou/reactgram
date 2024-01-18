import { authRepository, userRepository } from "../repositories";
import { AuthService, AuthServiceImpl } from "./auth/auth.service";
import { LocalStorageImpl } from "./storage";
import { UserService, UserServiceImpl } from "./user/user.service";

const storage = new LocalStorageImpl();

const authService: AuthService = new AuthServiceImpl(authRepository, storage);

const userService: UserService = new UserServiceImpl(userRepository);

export {
    authService,
    userService,
    storage
}