import HttpException from './HttpException';

export default class OrderNotFoundException extends HttpException {
    constructor() {
        super(400, 'Заказ не найден');
    }
}
