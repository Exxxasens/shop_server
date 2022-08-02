import HttpException from './HttpException';

export default class ImageNotFoundException extends HttpException {
    constructor() {
        super(404, 'Изображение не найдено');
    }
}
