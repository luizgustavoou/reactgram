import { AuthApi, AuthApiImpl } from "./auth/auth.api";
import { UserApi, UserApiImpl } from "./user/user.api";

const authApi: AuthApi = new AuthApiImpl();

const userApi: UserApi = new UserApiImpl();

export {
    authApi,
    userApi
}