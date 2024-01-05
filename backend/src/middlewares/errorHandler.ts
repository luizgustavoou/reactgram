import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../exceptions/BadRequestError";
import { ConflictError } from "../exceptions/ConflictError";
import { NotFoundError } from "../exceptions/NotFoundError";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";

import { Request, Response, NextFunction } from "express";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UnauthorizedError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: [err.message] });
    }

    if (err instanceof NotFoundError) {
        return res.status(StatusCodes.NOT_FOUND).json({ errors: [err.message] });
    }

    if (err instanceof ConflictError) {
        return res.status(StatusCodes.CONFLICT).json({ errors: [err.message] });
    }

    if (err instanceof BadRequestError) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: [err.message] });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: ["Ocorreu um erro inesperado. Tente novamente"] });
}