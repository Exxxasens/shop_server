import HttpException from './HttpException';

export default class ImageRequiredException extends HttpException {
    constructor() {
        super(400, 'Изображение обязательно');
    }
}
