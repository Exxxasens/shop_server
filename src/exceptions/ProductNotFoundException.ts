import HttpException from './HttpException';

export default class ProductNotFoundException extends HttpException {
    constructor() {
        super(401, 'Недостаточно прав');
    }
}
