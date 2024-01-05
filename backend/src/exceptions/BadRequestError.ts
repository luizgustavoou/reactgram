import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
    constructor(msg: string) {
        super(StatusCodes.BAD_REQUEST, msg);
        this.name = "BadRequestError"

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
