import { PhotoCreateValidator } from './PhotoCreateValidator';
import { PhotoUpdateValidator } from './builders/PhotoUpdateValidator';

const photoCreateValidator = new PhotoCreateValidator();

const photoUpdateValidator = new PhotoUpdateValidator();

export {
    photoCreateValidator,
    photoUpdateValidator
}