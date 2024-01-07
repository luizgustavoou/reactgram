import { PhotoValidatorBuilder, PhotoValidatorBuilderImpl } from "./builders/PhotoValidatorBuilder";
import { PhotoValidatorDirector } from "./builders/PhotoValidatorDirector";

export class PhotoCreateValidator {
    execute() {
        const builder: PhotoValidatorBuilder = new PhotoValidatorBuilderImpl();

        const director = new PhotoValidatorDirector(builder);

        director.makeCreateValidator();


        const validators = builder.getResult();

        return validators;
    }
}