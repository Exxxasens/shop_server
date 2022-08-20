import HttpException from './HttpException';

export default class CategoryNotFoundException extends HttpException {
    constructor() {
        super(404, 'Категория не найдена');
    }
}
