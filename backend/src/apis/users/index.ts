import { UserController } from "./user.controller";
import { UserService, UserServiceImpl } from "./user.service";
import { UserRouter } from './user.router';
import { UserRepository } from './repository/user.repository';
import { MongoUserRepositoryImpl } from "./repository/impl/user.repository.mongo";

const userRepository: UserRepository = new MongoUserRepositoryImpl();

const userService: UserService = new UserServiceImpl(userRepository);

const userController = new UserController(userService);

const userRouter = new UserRouter(userController);


export {
    userService, userController, userRouter
}