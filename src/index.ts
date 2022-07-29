import App from './app';
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';
import AddressController from './controllers/address.controller';
import ProductController from './controllers/product.controller';
import PropertyController from './controllers/property.controller';

const server = new App([new AuthController(), new UserController(), new AddressController(), new ProductController(), new PropertyController()]);

server.listen();
