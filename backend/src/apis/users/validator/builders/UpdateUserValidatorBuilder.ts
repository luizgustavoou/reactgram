import { ValidationChain, body } from "express-validator";
import { BadRequestError } from "../../../../exceptions/BadRequestError";

export interface UserValidatorBuilder {
    getResult(): ValidationChain[];

    reset(): void;

    buildName(): void;

    buildEmail(): void;

    buildPassword(): void;

    buildConfirmPassword(): void;
}

export class UserValidatorBuilderImpl implements UserValidatorBuilder {
    private result: ValidationChain[];

    constructor() {
        this.result = [];
    }

    reset() {
        this.result = [];
    }

    buildName() {
        this.result.push(
            body("name")
                .optional()
                .isLength({ min: 3 })
                .withMessage("O nome precisa ter no mínimo 3 caracteres.")
        );
    }

    buildEmail() {
        this.result.push(
            body("email").custom((value, { req }) => {
                if ("email" in req.body) {
                    throw new BadRequestError("Não é possível alterar o e-mail.");
                }

                return true;
            })
        );
    }

    buildPassword() {
        this.result.push(
            body("password")
                .optional()
                .isLength({ min: 3 })
                .withMessage("A senha precisa ter no mínimo 5 caracteres.")
        );
    }

    buildConfirmPassword() {
        this.result.push(
            body("confirmPassword")
                .optional()
                .custom((value, { req }) => {
                    if (value != req.body.password) {
                        throw new BadRequestError("As senhas não são iguais.");
                    }

                    return true;
                })
        );
    }

    getResult(): ValidationChain[] {
        return this.result;
    }
}
