export class ConflictError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "ConflictError"
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
