import { PhotoCreateValidator } from './PhotoCreateValidator';
import { PhotoUpdateValidator } from './PhotoUpdateValidator';
import { PhotoCommentPhotoValidator } from './PhotoCommentPhotoValidator';

const photoCreateValidator = new PhotoCreateValidator();

const photoUpdateValidator = new PhotoUpdateValidator();

const photoCommentPhotoValidator = new PhotoCommentPhotoValidator();
export {
    photoCreateValidator,
    photoUpdateValidator,
    photoCommentPhotoValidator
}