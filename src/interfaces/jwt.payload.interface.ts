import * as jwt from 'jsonwebtoken';

export default interface JwtPayload extends jwt.JwtPayload {
    id: string;
}
