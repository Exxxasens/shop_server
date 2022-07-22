import { Request, Response, NextFunction } from 'express';
import ValidationException from '../exceptions/ValidationException';
import Joi from 'joi';

const validateMiddleware = (schema: Joi.Schema) => async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return next(new ValidationException(error.message));
    }
    next();
};

export default validateMiddleware;
