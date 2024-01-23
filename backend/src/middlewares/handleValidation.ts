import { ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors: any[] = [];

    errors.array().map((err) => extractedErrors.push(err.msg));

    // TODO: Verificar pra passar next(new error)
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors: extractedErrors
    })
}