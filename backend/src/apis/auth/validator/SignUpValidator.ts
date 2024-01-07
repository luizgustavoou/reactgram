import { AuthValidatorBuilder, AuthValidatorBuilderImpl } from "./builders/AuthValidatorBuilder";
import { AuthValidatorDirector } from "./builders/AuthValidatorDirector";

export class SignUpValidator {
    execute() {
        const validatorBuilder: AuthValidatorBuilder = new AuthValidatorBuilderImpl();

        const director = new AuthValidatorDirector(validatorBuilder);

        director.makeSignUpValidator();

        const validators = validatorBuilder.getResult();

        return validators;
    }
}



