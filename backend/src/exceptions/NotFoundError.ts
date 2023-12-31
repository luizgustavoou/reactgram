export class NotFoundError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "NotFoundError"
        Object.setPrototypeOf(this, NotFoundError.prototype);

    }
}
