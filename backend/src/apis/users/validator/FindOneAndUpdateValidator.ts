import { ValidatorBuilder } from "./builders/ValidatorBuilder";
import { ValidatorBuilderUpdateImpl } from "./builders/ValidatorBuilderUpdate";
import { ValidatorDirector } from "./builders/ValidatorDirector";

export class FindOneAndUpdateValidator {
    execute() {
        const validationBuilder: ValidatorBuilder = new ValidatorBuilderUpdateImpl();

        const director = new ValidatorDirector(validationBuilder);
    
        director.makeUpdateUserValidation();
    
        const validators = validationBuilder.getResult();
    
        return validators;
    }
}
