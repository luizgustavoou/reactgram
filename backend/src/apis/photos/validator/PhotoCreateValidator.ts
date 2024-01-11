import { PhotoCreateValidatorBuilderImpl } from "./builders/PhotoCreateValidator";
import { PhotoValidatorBuilder } from "./builders/PhotoValidatorBuilder";
import { PhotoValidatorDirector } from "./builders/PhotoValidatorDirector";

export class PhotoCreateValidator {
    execute() {
        const builder: PhotoValidatorBuilder = new PhotoCreateValidatorBuilderImpl();

        const director = new PhotoValidatorDirector(builder);

        director.makeCreateValidator();

        const validators = builder.getResult();

        return validators;
    }
}