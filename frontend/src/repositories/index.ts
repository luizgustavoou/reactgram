import { authApi } from '../apis';
import { AuthRepository, AuthRepositoryImpl } from './auth/AuthRepository';


const authRepository: AuthRepository = new AuthRepositoryImpl(authApi);

export {
    authRepository
}