import {
  authRepository,
  photoRepository,
  userRepository,
} from "../repositories";
import { AuthService, AuthServiceImpl } from "./auth/auth.service";
import { IPhotoService, PhotoServiceImpl } from "./photo/photo.service";
import { LocalStorageImpl } from "./storage";
import { UserService, UserServiceImpl } from "./user/user.service";

const storage = new LocalStorageImpl();

const authService: AuthService = new AuthServiceImpl(authRepository, storage);

const userService: UserService = new UserServiceImpl(userRepository);

const photoService: IPhotoService = new PhotoServiceImpl(photoRepository);

export { authService, userService, photoService, storage };
