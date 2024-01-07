import { UserValidatorBuilder } from './UserValidatorBuilder';

export class UserValidatorDirector {
    private builder: UserValidatorBuilder;

    constructor(builder: UserValidatorBuilder) {
        this.builder = builder;
    }

    changeBuilder(validatorBuilder: UserValidatorBuilder) {
        this.builder = validatorBuilder;
    }

    makeFindOneAndUpdateValidator() {
        this.builder.reset();
        this.builder.buildName();
        this.builder.buildEmail();
        this.builder.buildPassword();
    }
}