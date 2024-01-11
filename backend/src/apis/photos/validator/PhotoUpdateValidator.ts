import { PhotoValidatorBuilder } from './builders/PhotoValidatorBuilder';
import { PhotoValidatorDirector } from './builders/PhotoValidatorDirector';
import { UpdatePhotoValidatorBuilderImpl } from './builders/UpdatePhotoValidatorBuilder';

export class PhotoUpdateValidator {
    execute() {
        const builder: PhotoValidatorBuilder = new UpdatePhotoValidatorBuilderImpl();

        const director = new PhotoValidatorDirector(builder);

        director.makeCreateValidator();

        const validators = builder.getResult();

        return validators;
    }
}