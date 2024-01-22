import { IAuthApi, AuthApiImpl } from "./auth/auth.api";
import { IPhotoApi, PhotoApiImpl } from "./photo/photo.api";
import { IUserApi, UserApiImpl } from "./user/user.api";

const authApi: IAuthApi = new AuthApiImpl();

const userApi: IUserApi = new UserApiImpl();

const photoApi: IPhotoApi = new PhotoApiImpl();

export { authApi, userApi, photoApi };
