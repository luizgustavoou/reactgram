import { ValidatorBuilder } from "./builders/ValidatorBuilder";
import { ValidatorBuilderCreateImpl } from "./builders/ValidatorBuilderCreate";
import { ValidatorDirector } from "./builders/ValidatorDirector";

export class SignInValidator {
    execute() {
        const validationBuilder: ValidatorBuilder = new ValidatorBuilderCreateImpl();

        const director = new ValidatorDirector(validationBuilder);
    
        director.makeSignInValidation();
    
        const validators = validationBuilder.getResult();
    
        return validators;
    }
}





