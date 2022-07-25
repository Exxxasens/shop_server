import App from './app';
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';
import AddressController from './controllers/address.controller';

const server = new App([new AuthController(), new UserController(), new AddressController()]);

server.listen();
