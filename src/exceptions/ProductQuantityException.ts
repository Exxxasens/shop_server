import HttpException from './HttpException';

export default class ProductQuantityException extends HttpException {
    constructor() {
        super(400, 'Товар не доступен в данном количестве');
    }
}
