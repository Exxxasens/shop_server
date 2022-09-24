import HttpException from './HttpException';

export default class AddressLimitExceeded extends HttpException {
    constructor() {
        super(400, 'Превышено максимально число адресов');
    }
}
