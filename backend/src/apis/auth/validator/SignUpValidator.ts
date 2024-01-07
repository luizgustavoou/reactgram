import { ValidatorBuilder } from "./builders/ValidatorBuilder";
import { ValidatorBuilderCreateImpl } from "./builders/ValidatorBuilderCreate";
import { AuthValidatorDirector } from "./builders/AuthValidatorDirector";

export class SignUpValidator {
    execute() {
        const validatorBuilder: ValidatorBuilder = new ValidatorBuilderCreateImpl();

        const director = new AuthValidatorDirector(validatorBuilder);

        director.makeSignUpValidation();

        const validators = validatorBuilder.getResult();

        return validators;
    }
}



