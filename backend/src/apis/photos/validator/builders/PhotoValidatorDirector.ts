import { PhotoValidatorBuilder } from './PhotoValidatorBuilder';

export class PhotoValidatorDirector {
    private builder: PhotoValidatorBuilder;

    constructor(builder: PhotoValidatorBuilder) {
        this.builder = builder;
    }

    changeBuilder(validatorBuilder: PhotoValidatorBuilder) {
        this.builder = validatorBuilder;
    }

    makeCreateValidator() {
        this.builder.reset();

        this.builder.buildTitle();
        this.builder.buildImage();

    }

    makeUpdateValidator() {
        this.builder.reset();

        this.builder.buildTitle();
    }
}