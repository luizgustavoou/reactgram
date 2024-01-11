import { ValidationChain, body } from "express-validator";
import { PhotoValidatorBuilder } from "./PhotoValidatorBuilder";
import { BadRequestError } from "../../../../exceptions/BadRequestError";

export class UpdatePhotoValidatorBuilderImpl implements PhotoValidatorBuilder {
    private result: ValidationChain[];

    constructor() {
        this.result = [];
    }
    buildComment(): void {
        this.result.push(
            body("comment").isString().withMessage("O comentário é obrigatório.")
        );
    }

    reset() {
        this.result = [];
    }

    buildTitle(): void {
        this.result.push(
            body("title")
                .optional()
                .isString()
                .withMessage("O título é obrigatório.")
                .isLength({ min: 3 })
                .withMessage("O título precisa ter no mínimo 3 caracteres.")
        );
    }

    buildImage(): void {
        this.result.push(
            body("image")
                .optional()
                .custom((value, { req }) => {
                    if (!req.file) {
                        throw new BadRequestError("A imagem é obrigatória.");
                    }

                    return true;
                })
        );
    }

    getResult(): ValidationChain[] {
        return this.result;
    }
}
