import App from './app';
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';
import AddressController from './controllers/address.controller';
import ProductController from './controllers/product.controller';
import PropertyController from './controllers/property.controller';
import ImageController from './controllers/image.controller';
import CategoryController from './controllers/category.controller';

const server = new App();

server.useControllers([
    new AuthController(),
    new UserController(),
    new AddressController(),
    new ProductController(),
    new PropertyController(),
    new ImageController(),
    new CategoryController()
]);

server.listen();
