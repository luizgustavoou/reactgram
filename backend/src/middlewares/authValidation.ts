import { body } from "express-validator";
import { ValidatorDirector } from "../builders/validator/ValidatorDirector";
import { ValidatorBuilder, ValidatorBuilderImpl } from "../builders/validator/ValidatorBuilder";

export const authSignUpValidation = () => {
    const validatorBuilder: ValidatorBuilder = new ValidatorBuilderImpl();

    const director = new ValidatorDirector(validatorBuilder);

    director.makeSignUpValidation();

    const validators = validatorBuilder.getResult();

    return validators;
};

export const authSignInValidation = () => {
    const validationBuilder: ValidatorBuilder = new ValidatorBuilderImpl();

    const director = new ValidatorDirector(validationBuilder);

    director.makeLoginValidation();

    const validators = validationBuilder.getResult();

    return validators;
}