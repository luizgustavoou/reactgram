import { UserValidatorBuilder, UserValidatorBuilderImpl } from "./builders/UserValidatorBuilder";
import { UserValidatorDirector } from "./builders/UserValidatorDirector";


export class FindOneAndUpdateValidator {
    execute() {
        const validationBuilder: UserValidatorBuilder = new UserValidatorBuilderImpl();

        const director = new UserValidatorDirector(validationBuilder);

        director.makeFindOneAndUpdateValidator();

        const validators = validationBuilder.getResult();

        return validators;
    }
}
