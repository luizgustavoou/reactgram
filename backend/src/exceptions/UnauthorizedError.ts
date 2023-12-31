export class UnauthorizedError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "UnauthorizedError"
        Object.setPrototypeOf(this, UnauthorizedError.prototype);

    }
}
