import { authRepository } from "../repositories";
import { AuthService, AuthServiceImpl } from "./auth/AuthService";
import { LocalStorageImpl } from "./storage";

const storage = new LocalStorageImpl();

const authService: AuthService = new AuthServiceImpl(authRepository, storage);

export {
    authService,
    storage
}