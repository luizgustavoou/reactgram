import { UserService } from '../users/user.service';
import { JwtService } from '../../utils/jwt/jwt.service';
import { BcryptService } from '../../utils/bcrypt/bcrypt.service';
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private bcryptService: BcryptService) { }

    async signup(name: string, email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);

        if (user) {
            throw new Error("Por favor, utilizar outro e-mail");
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

    async login() {

    }

    getTokens(id: string) {
        const token = this.jwtService.generateToken(id);

        return {
            token,
        }
    }
}