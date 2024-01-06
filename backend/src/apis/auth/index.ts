import { AuthService, AuthServiceImpl } from "./auth.service";
import { AuthController } from './auth.controller';
import { authMiddleware, userService } from "../users";
import { AuthRouter } from "./auth.router";
import { jwtService } from "../../utils/jwt";
import { bcryptService } from "../../utils/bcrypt";


const authService: AuthService= new AuthServiceImpl(userService, jwtService, bcryptService);

const authController = new AuthController(authService);

const authRouter = new AuthRouter(authController, authMiddleware);

export {
    authService, authController, authRouter
}