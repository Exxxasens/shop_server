import HttpException from './HttpException';

export default class AddressNotFoundException extends HttpException {
    constructor() {
        super(400, 'Аккаунт администратора уже создан');
    }
}
