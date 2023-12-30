import { BcryptService, BcryptServiceImpl } from './bcrypt.service';

const bcryptService: BcryptService = new BcryptServiceImpl();

export {
    bcryptService
}