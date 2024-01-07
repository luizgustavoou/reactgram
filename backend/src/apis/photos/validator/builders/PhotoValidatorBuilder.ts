import { ValidationChain, body } from "express-validator";
import { BadRequestError } from "../../../../exceptions/BadRequestError";

export interface PhotoValidatorBuilder {
    getResult(): ValidationChain[];

    reset(): void;

}

export class PhotoValidatorBuilderImpl implements PhotoValidatorBuilder {
    private result: ValidationChain[];

    constructor() {
        this.result = [];
    }


    reset() {
        this.result = [];
    }


    getResult(): ValidationChain[] {
        return this.result;
    }
}