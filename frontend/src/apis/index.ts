import { AuthApi, AuthApiImpl } from "./auth/AuthApi";

const authApi: AuthApi = new AuthApiImpl();

export {
    authApi
}