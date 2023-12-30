import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRouter } from './user.router';
import { UserRepository } from './repository/user.repository';
import { MongoUserRepositoryImpl } from "./repository/impl/user.repository.mongo";
import { BcryptServiceImpl } from "../../utils/bcrypt/bcrypt.service";


const bcryptService = new BcryptServiceImpl();

const userRepository: UserRepository = new MongoUserRepositoryImpl();

const userService = new UserService(userRepository);

const userController = new UserController(userService);

const userRouter = new UserRouter(userController);


export {
    userService, userController, userRouter
}