import { authRepository } from "../repositories";
import { AuthService, AuthServiceImpl } from "./AuthService";

const authService: AuthService = new AuthServiceImpl(authRepository);

export {
    authService
}