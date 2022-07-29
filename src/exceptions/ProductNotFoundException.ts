import HttpException from './HttpException';

export default class ProductNotFoundException extends HttpException {
    constructor() {
        super(404, 'Товар не найден');
    }
}
