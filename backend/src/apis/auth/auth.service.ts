import { IUserService } from '../users/user.service';
import { JwtService } from '../../helpers/jwt/jwt.service';
import { BcryptService } from '../../helpers/bcrypt/bcrypt.service';
import { NotFoundError } from '../../exceptions/NotFoundError';
import { UnauthorizedError } from '../../exceptions/UnauthorizedError';
import { ConflictError } from '../../exceptions/ConflictError';

export interface ResponseSignUp {
    _id: string,
    token: string
}

export interface ResponseSignIn {
    _id: string,
    token: string
}

export interface AuthService {
    signup(name: string, email: string, password: string): Promise<ResponseSignUp>;

    signin(email: string, password: string): Promise<ResponseSignIn>;
}

export class AuthServiceImpl implements AuthService {
    constructor(private userService: IUserService, private jwtService: JwtService, private bcryptService: BcryptService) { }

    async signin(email: string, password: string): Promise<ResponseSignIn> {
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            throw new NotFoundError("Usuário não encontrado.");
        }

        const compare = await this.bcryptService.compare(password, user.password);

        if (!compare) {
            throw new UnauthorizedError("Senha incorreta.");
        }

        const { token } = this.getTokens(user.id);

        return {
            _id: user.id,
            token
        };
    }

    async signup(name: string, email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);

        if (user) {
            throw new ConflictError("Por favor, utilizar outro e-mail");
        }

        const passwordHash = await this.bcryptService.generateHash(password);

        const newUser = await this.userService.create(
            name,
            email,
            passwordHash
        );

        if (!newUser) {
            throw new Error("Houve um erro, por favor tente mais tarde.");
        }

        const { token } = this.getTokens(newUser.id);

        return {
            _id: newUser.id,
            token
        }

    }

    private getTokens(id: string) {
        const token = this.jwtService.generateToken(id);

        return {
            token,
        }
    }
}