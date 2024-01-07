import { SignUpValidator } from './SignUpValidator';
import { SignInValidator } from './SignInValidator';

const signUpValidator = new SignUpValidator();

const signInValidator = new SignInValidator();

export {
    signUpValidator,
    signInValidator
}