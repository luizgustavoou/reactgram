import { ValidationChain } from "express-validator";

export interface ValidatorBuilder {
    getResult(): ValidationChain[];

    reset(): void;

    buildName(): void;

    buildEmail(): void;

    buildPassword(): void;

    buildConfirmPassword(): void;
}

