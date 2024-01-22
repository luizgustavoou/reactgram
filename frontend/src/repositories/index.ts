import { authApi, photoApi, userApi } from '../apis';
import { AuthRepository, AuthRepositoryImpl } from './auth/auth.repository';
import { UserRepository, UserRepositoryImpl } from './user/user.repository';

import { IPhotoRepository, PhotoRepositoryImpl } from './photo/photo.repository';


const authRepository: AuthRepository = new AuthRepositoryImpl(authApi);

const userRepository: UserRepository = new UserRepositoryImpl(userApi);

const photoRepository: IPhotoRepository = new PhotoRepositoryImpl(photoApi);


export {
    authRepository,
    userRepository,
    photoRepository
}