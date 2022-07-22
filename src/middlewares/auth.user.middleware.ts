import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const authUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('user-jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        console.log(err, user, info);
        req.user = user;
        next();
    })(req, res, next);
};

export default authUserMiddleware;
