import { PhotoValidatorBuilder } from './PhotoValidatorBuilder';

export class PhotoValidatorDirector {
    private builder: PhotoValidatorBuilder;

    constructor(builder: PhotoValidatorBuilder) {
        this.builder = builder;
    }

    changeBuilder(validatorBuilder: PhotoValidatorBuilder) {
        this.builder = validatorBuilder;
    }

    makeSomething() {
        this.builder.reset();

    }
}