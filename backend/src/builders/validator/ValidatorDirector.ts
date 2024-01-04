import { ValidatorBuilder } from './ValidatorBuilder';

export class ValidatorDirector {
    private builder: ValidatorBuilder;

    constructor(builder: ValidatorBuilder) {
        this.builder = builder;
    }

    changeBuilder(validatorBuilder: ValidatorBuilder) {
        this.builder = validatorBuilder;
    }

    makeSignUpValidation() {
        this.builder.reset();
        this.builder.buildName();
        this.builder.buildEmail();
        this.builder.buildConfirmPassword();
    }

    makeSignInValidation() {
        this.builder.reset();
        this.builder.buildEmail();
        this.builder.buildPassword();
    }

    makeUpdateUserValidation() {
        this.builder.reset();
        this.builder.buildName();
        this.builder.buildPassword();
    }
}