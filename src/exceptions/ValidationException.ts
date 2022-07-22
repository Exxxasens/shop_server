import HttpExpcetion from './HttpException';

export default class ValidationException extends HttpExpcetion {
    constructor(message: string) {
        super(400, message);
    }
}
