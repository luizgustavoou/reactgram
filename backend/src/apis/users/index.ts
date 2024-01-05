import { UserController } from "./user.controller";
import { UserService, UserServiceImpl } from "./user.service";
import { UserRouter } from './user.router';
import { UserRepository } from './repository/user.repository';
import { MongoUserRepositoryImpl } from "./repository/impl/user.repository.mongo";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { jwtService } from "../../utils/jwt";

const userRepository: UserRepository = new MongoUserRepositoryImpl();

const userService: UserService = new UserServiceImpl(userRepository);

const authMiddleware: AuthMiddleware = new AuthMiddleware(userService, jwtService); // adicionado

const userController = new UserController(userService);

const userRouter = new UserRouter(userController, authMiddleware);

export {
    userService, userController, userRouter
}