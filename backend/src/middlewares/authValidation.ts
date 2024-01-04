import { ValidatorDirector } from "../builders/validator/ValidatorDirector";
import { ValidatorBuilder } from "../builders/validator/ValidatorBuilder";
import { ValidatorBuilderCreateImpl } from "../builders/validator/ValidatorBuilderCreate";
import { ValidatorBuilderUpdateImpl } from '../builders/validator/ValidatorBuilderUpdate';

// export class AuthValidator {
//     signUpValidation() {
//         const validatorBuilder: ValidatorBuilder = new ValidatorBuilderImpl();

//         const director = new ValidatorDirector(validatorBuilder);

//         director.makeSignUpValidation();

//         const validators = validatorBuilder.getResult();

//         return validators;
//     }

//     signInValidation() {
//         const validationBuilder: ValidatorBuilder = new ValidatorBuilderImpl();

//         const director = new ValidatorDirector(validationBuilder);

//         director.makeSignInValidation();

//         const validators = validationBuilder.getResult();

//         return validators;
//     }
// }

export const authSignUpValidation = () => {
    const validatorBuilder: ValidatorBuilder = new ValidatorBuilderCreateImpl();

    const director = new ValidatorDirector(validatorBuilder);

    director.makeSignUpValidation();

    const validators = validatorBuilder.getResult();

    return validators;
};

export const authSignInValidation = () => {
    const validationBuilder: ValidatorBuilder = new ValidatorBuilderCreateImpl();

    const director = new ValidatorDirector(validationBuilder);

    director.makeSignInValidation();

    const validators = validationBuilder.getResult();

    return validators;
}

export const userUpdateValidation = () => {
    const validationBuilder: ValidatorBuilder = new ValidatorBuilderUpdateImpl();

    const director = new ValidatorDirector(validationBuilder);

    director.makeUpdateUserValidation();

    const validators = validationBuilder.getResult();

    return validators;
}