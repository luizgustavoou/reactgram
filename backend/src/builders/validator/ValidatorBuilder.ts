export interface ValidatorBuilder<T = any> {
    getResult(): T[];

    reset(): void;

    buildName(): void;

    buildEmail(): void;

    buildPassword(): void;

    buildConfirmPassword(): void;
}

