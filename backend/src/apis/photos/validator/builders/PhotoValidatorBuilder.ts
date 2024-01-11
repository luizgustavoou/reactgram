import { ValidationChain, body } from "express-validator";
import { BadRequestError } from "../../../../exceptions/BadRequestError";

export interface PhotoValidatorBuilder {
    getResult(): ValidationChain[];

    buildTitle(): void;

    buildImage(): void;

    buildComment(): void;

    reset(): void;
}

