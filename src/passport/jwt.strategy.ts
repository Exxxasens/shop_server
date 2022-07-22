import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import JwtPayload from '../interfaces/jwt.payload.interface';
import UserModel from '../models/user.model';
import TokenExpiredException from '../exceptions/TokenExpiredException';

const secret = process.env.JWT_SECRET || 'secret';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: true,
    secretOrKey: secret
};

const useJwtStrategy = () => {
    passport.use(
        'jwt-user',
        new Strategy(options, function ({ id, exp }: JwtPayload, done: VerifiedCallback) {
            UserModel.findOne({ _id: id }, function (err, user) {
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
