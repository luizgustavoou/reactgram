import { PhotoValidatorBuilder } from './PhotoValidatorBuilder';
import { PhotoValidatorDirector } from './PhotoValidatorDirector';
import { UpdatePhotoValidatorBuilderImpl } from './UpdatePhotoValidatorBuilder';

export class PhotoUpdateValidator {
    execute() {
        const builder: PhotoValidatorBuilder = new UpdatePhotoValidatorBuilderImpl();

        const director = new PhotoValidatorDirector(builder);

        director.makeCreateValidator();

        const validators = builder.getResult();

        return validators;
    }
}