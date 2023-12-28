import bcryptjs from 'bcryptjs';

export interface BcryptService {
    generateHash(content: string): Promise<string>;
}

export class BcryptServiceImpl implements BcryptService {
    async generateHash(content: string) {
        const salt = await bcryptjs.genSalt();
        const passwordHash = await bcryptjs.hash(content, salt);

        return passwordHash;
    }
}