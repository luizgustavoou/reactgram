export class BadRequestError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "BadRequestError"
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
