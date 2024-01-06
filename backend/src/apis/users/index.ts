import { UserController } from "./user.controller";
import { UserService, UserServiceImpl } from "./user.service";
import { UserRouter } from './user.router';
import { UserRepository } from './repository/user.repository';
import { MongoUserRepositoryImpl } from "./repository/impl/user.repository.mongo";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { jwtService } from "../../utils/jwt";
import { bcryptService } from "../../utils/bcrypt";

const userRepository: UserRepository = new MongoUserRepositoryImpl();

const userService: UserService = new UserServiceImpl(userRepository, bcryptService);

// OBS: se colocar o authMiddleware em /middlewares/index.ts, dá erro. Precisei colocá-lo aqui
const authMiddleware: AuthMiddleware = new AuthMiddleware(userService, jwtService);

const userController = new UserController(userService);

const userRouter = new UserRouter(userController, authMiddleware);

export {
    userService, userController, userRouter, authMiddleware
}