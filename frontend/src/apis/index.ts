import { AuthApi, AuthApiImpl } from "./AuthApi";

const authApi: AuthApi = new AuthApiImpl();

export {
    authApi
}