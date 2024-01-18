import { authApi, userApi } from '../apis';
import { AuthRepository, AuthRepositoryImpl } from './auth/auth.repository';
import { UserRepository, UserRepositoryImpl } from './user/user.repository';


const authRepository: AuthRepository = new AuthRepositoryImpl(authApi);

const userRepository: UserRepository = new UserRepositoryImpl(userApi);

export {
    authRepository,
    userRepository
}