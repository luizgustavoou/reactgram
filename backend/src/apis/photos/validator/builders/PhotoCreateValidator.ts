import { ValidationChain, body } from "express-validator";
import { PhotoValidatorBuilder } from "./PhotoValidatorBuilder";
import { BadRequestError } from "../../../../exceptions/BadRequestError";

export class PhotoCreateValidatorBuilderImpl implements PhotoValidatorBuilder {
    private result: ValidationChain[];

    constructor() {
        this.result = [];
    }

    reset() {
        this.result = [];
    }

    buildTitle(): void {
        this.result.push(
            body("title")
                .not()
                .equals("undefined")
                .withMessage("O título é obrigatório.")
                .isString()
                .withMessage("O título é obrigatório.")
                .isLength({ min: 3 })
                .withMessage("O título precisa ter no mínimo 3 caracteres.")
        );
    }

    buildImage(): void {
        this.result.push(body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new BadRequestError("A imagem é obrigatória.")
            }

            return true;
        }));
    }

    getResult(): ValidationChain[] {
        return this.result;
    }
}