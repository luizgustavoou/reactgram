import { AuthValidatorBuilder } from "./AuthValidatorBuilder";

export class AuthValidatorDirector {
    private builder: AuthValidatorBuilder;

    constructor(builder: AuthValidatorBuilder) {
        this.builder = builder;
    }

    changeBuilder(validatorBuilder: AuthValidatorBuilder) {
        this.builder = validatorBuilder;
    }

    makeSignUpValidator() {
        this.builder.reset();
        this.builder.buildName();
        this.builder.buildEmail();
        this.builder.buildConfirmPassword();
    }

    makeSignInValidator() {
        this.builder.reset();
        this.builder.buildEmail();
        this.builder.buildPassword();
    }

}