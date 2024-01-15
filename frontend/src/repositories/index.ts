import { authApi } from '../apis';
import { AuthRepository, AuthRepositoryImpl } from './AuthRepository';


const authRepository: AuthRepository = new AuthRepositoryImpl(authApi);

export {
    authRepository
}