import { ValidatorBuilder } from "./builders/ValidatorBuilder";
import { ValidatorBuilderCreateImpl } from "./builders/ValidatorBuilderCreate";
import { AuthValidatorDirector } from "./builders/AuthValidatorDirector";


export class SignInValidator {
    execute() {
        const validationBuilder: ValidatorBuilder = new ValidatorBuilderCreateImpl();

        const director = new AuthValidatorDirector(validationBuilder);

        director.makeSignInValidation();

        const validators = validationBuilder.getResult();

        return validators;
    }
}





