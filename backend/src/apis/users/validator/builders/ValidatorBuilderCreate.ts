import { ValidationChain, body } from "express-validator";
import { ValidatorBuilder } from "./ValidatorBuilder";
import { BadRequestError } from "../../../../exceptions/BadRequestError";

export class ValidatorBuilderCreateImpl implements ValidatorBuilder {
    private result: ValidationChain[];

    constructor() {
        this.result = [];
    }


    reset() {
        this.result = [];
    }

    buildName() {
        this.result.push(body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caracteres."),);
    }

    buildEmail() {
        this.result.push(body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido."),);
    }

    buildPassword() {
        this.result.push(body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 3 })
            .withMessage("A senha precisa ter no mínimo 5 caracteres."),);
    }

    buildConfirmPassword() {
        this.result.push(
            body("confirmpassword").isString().withMessage("A confirmação de senha é obrigatória").custom((value, { req }) => {
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