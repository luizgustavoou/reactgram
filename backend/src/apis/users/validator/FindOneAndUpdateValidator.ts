import { UserValidatorDirector } from "./builders/UserValidatorDirector";
import { ValidatorBuilder } from "./builders/ValidatorBuilder";
import { ValidatorBuilderUpdateImpl } from "./builders/ValidatorBuilderUpdate";

export class FindOneAndUpdateValidator {
    execute() {
        const validationBuilder: ValidatorBuilder = new ValidatorBuilderUpdateImpl();

        const director = new UserValidatorDirector(validationBuilder);
    
        director.makeUpdateUserValidation();
    
        const validators = validationBuilder.getResult();
    
        return validators;
    }
}
