import App from './app';
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';

const server = new App([new AuthController(), new UserController()]);

server.listen();
