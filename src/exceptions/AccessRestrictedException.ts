import HttpException from './HttpException';

export default class AccessRestrictedException extends HttpException {
    constructor() {
        super(401, 'Недостаточно прав');
    }
}
