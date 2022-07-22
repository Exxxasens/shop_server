import HttpExpcetion from './HttpException';

export default class WrongCredentialsException extends HttpExpcetion {
    constructor() {
        super(401, 'Неверные учетные данные');
    }
}
