import { AuthValidatorDirector } from "./builders/AuthValidatorDirector";
import { AuthValidatorBuilder, AuthValidatorBuilderImpl } from './builders/AuthValidatorBuilder';


export class SignInValidator {
    execute() {
        const validationBuilder: AuthValidatorBuilder = new AuthValidatorBuilderImpl();

        const director = new AuthValidatorDirector(validationBuilder);

        director.makeSignInValidator();

        const validators = validationBuilder.getResult();

        return validators;
    }
}





