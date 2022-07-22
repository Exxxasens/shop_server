import HttpException from './HttpException';

export default class UserAlreadyRegisteredException extends HttpException {
    constructor() {
        super(400, 'Пользователь уже зарегистрирован');
    }
}
