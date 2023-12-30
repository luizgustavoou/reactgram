import { ValidatorBuilder, ValidatorBuilderImpl } from './ValidatorBuilder';

export class ValidatorDirector {
    private builder: ValidatorBuilder;

    constructor(builder: ValidatorBuilder) {
        this.builder = builder;
    }

    changeBuilder(validatorBuilder: ValidatorBuilder) {
        this.builder = validatorBuilder;
    }

    make(type: string) {

    }

    makeSignUpValidation() {
        this.builder.reset();
        this.builder.buildName();
        this.builder.buildName();
        this.builder.buildEmail();
        this.builder.buildConfirmPassword();
    }

    makeLoginValidation() {
        this.builder.reset();
        this.builder.buildEmail();
        this.builder.buildPassword();
    }

    makePhotoValidation() {

    }
}