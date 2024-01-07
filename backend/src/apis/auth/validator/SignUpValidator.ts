import { ValidatorBuilder } from "./builders/ValidatorBuilder";
import { ValidatorBuilderCreateImpl } from "./builders/ValidatorBuilderCreate";
import { ValidatorDirector } from "./builders/ValidatorDirector";

export class SignUpValidator {
    execute() {
        const validatorBuilder: ValidatorBuilder = new ValidatorBuilderCreateImpl();

        const director = new ValidatorDirector(validatorBuilder);
    
        director.makeSignUpValidation();
    
        const validators = validatorBuilder.getResult();
    
        return validators;
    }
}



