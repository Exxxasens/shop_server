import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpException) {
        return res.json({
            status: error.status,
            message: error.message
        });
    }

    if (error instanceof Error) {
        return res.json({
            status: 500,
            message: error.message
        });
    }

    next();
};

export default errorMiddleware;
