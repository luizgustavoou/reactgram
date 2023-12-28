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

    makeUserValidation() {
        this.builder.reset();
        this.builder.buildName();
        this.builder.buildName();
        this.builder.buildEmail();
        this.builder.buildConfirmPassword();
    }

    makePhotoValidation() {
        
    }
}