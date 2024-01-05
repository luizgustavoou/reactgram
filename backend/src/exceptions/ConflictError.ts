import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(msg: string) {
        super(StatusCodes.CONFLICT, msg);
        this.name = "ConflictError"
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
