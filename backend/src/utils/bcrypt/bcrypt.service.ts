import { hash, genSalt, compare } from 'bcryptjs';

export interface BcryptService {
    generateHash(content: string): Promise<string>;

    compare(content: string, hash: string): Promise<boolean>
}

export class BcryptServiceImpl implements BcryptService {
    async generateHash(content: string) {
        const salt = await genSalt();
        const passwordHash = await hash(content, salt);

        return passwordHash;
    }

    async compare(content: string, hash: string): Promise<boolean> {
        const result = await await compare(content, hash);

        return result;
    }
}