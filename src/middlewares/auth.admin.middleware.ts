import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import AccessRestrictedException from '../exceptions/AccessRestrictedException';

const authAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('user-jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);

        if (user.role !== 'admin') {
            return next(new AccessRestrictedException());
        }

        req.user = user;

        next();
    })(req, res, next);
};

export default authAdminMiddleware;
