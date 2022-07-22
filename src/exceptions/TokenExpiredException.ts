import HttpExpcetion from './HttpException';

export default class TokenExpiredException extends HttpExpcetion {
    constructor() {
        super(401, 'Срок действия токена истек');
    }
}
