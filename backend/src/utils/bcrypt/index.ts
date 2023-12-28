import { BcryptService, BcryptServiceImpl } from './bcrypt.service';

const bcryptService = new BcryptServiceImpl();

export {
    bcryptService
}