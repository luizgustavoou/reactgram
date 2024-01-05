import { userService } from "../apis/users";
import { jwtService } from "../utils/jwt";
import { AuthMiddleware } from "./authMiddleware";
import { ErrorHandler } from "./errorHandler";

const errorHandler = new ErrorHandler();

// OBS: se colocar o authMiddleware aqui, dá erro. Precisei colocá-lo no arquivo /users/index.ts

export {
    errorHandler,
}