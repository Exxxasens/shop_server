import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import JwtPayload from '../interfaces/jwt.payload.interface';
import UserModel from '../models/user.model';
import TokenExpiredException from '../exceptions/TokenExpiredException';
import UserDocument from '../interfaces/user.document.interface';
import { CallbackError } from 'mongoose';

const secret = process.env.JWT_SECRET || 'secret';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: true,
    secretOrKey: secret
};
const useJwtStrategy = () => {
    passport.use(
        'user-jwt',
        new Strategy(options, function ({ id, exp }: JwtPayload, done: VerifiedCallback) {
            UserModel.findOne({ _id: id }, function (err: CallbackError, user: UserDocument) {
                if (err) {
                    return done(err, null);
                }

                if (exp !== undefined && Date.now() >= exp * 1000) {
                    return done(new TokenExpiredException(), null);
                }

                if (user) {
                    return done(null, user);
                }
            });
        })
    );
};

export default useJwtStrategy;
