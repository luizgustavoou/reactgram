import { body } from "express-validator";
import { ValidatorDirector } from "../builders/validator/ValidatorDirector";
import { ValidatorBuilder, ValidatorBuilderImpl } from "../builders/validator/ValidatorBuilder";

export const userCreateValidation = () => {
    const validatorBuilder: ValidatorBuilder = new ValidatorBuilderImpl();

    const director = new ValidatorDirector(validatorBuilder);

    director.makeUserValidation();

    const validators = validatorBuilder.getResult();

    return validators;
};