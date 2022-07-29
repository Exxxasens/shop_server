import HttpException from './HttpException';

export default class PropertyNotFoundException extends HttpException {
    constructor() {
        super(404, 'Свойство не найдено');
    }
}
