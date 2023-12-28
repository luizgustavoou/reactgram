import { AuthService } from "./auth.service";
import { AuthController } from './auth.controller';
import { userService } from "../users";
import { AuthRouter } from "./auth.router";
import { jwtService } from "../../utils/jwt";

const authService = new AuthService(userService, jwtService);

const authController = new AuthController(authService);

const authRouter = new AuthRouter(authController);

export {
    authService, authController, authRouter
}