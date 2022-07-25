import HttpException from './HttpException';

export default class AddressNotFoundException extends HttpException {
    constructor() {
        super(404, 'Адрес не найден');
    }
}
