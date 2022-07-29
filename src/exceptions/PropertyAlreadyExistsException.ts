import HttpException from './HttpException';

export default class PropertyAlreadyExistsException extends HttpException {
    constructor() {
        super(400, 'Свойство уже существует');
    }
}
