import { ValidatorBuilder } from './ValidatorBuilder';

export class UserValidatorDirector {
    private builder: ValidatorBuilder;

    constructor(builder: ValidatorBuilder) {
        this.builder = builder;
    }

    changeBuilder(validatorBuilder: ValidatorBuilder) {
        this.builder = validatorBuilder;
    }

    makeUpdateUserValidation() {
        this.builder.reset();
        this.builder.buildName();
        this.builder.buildEmail();
        this.builder.buildPassword();
    }
}