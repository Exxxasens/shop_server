import { Router, Request, Response, NextFunction } from 'express';
import { CreateOrderDto, CreateOrderSchema } from '../dto/order/create.order.dto';
import OrderNotFoundException from '../exceptions/OrderNotFoundException';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import ProductQuantityException from '../exceptions/ProductQuantityException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import Controller from '../interfaces/controller.interface';
import authUserMiddleware from '../middlewares/auth.user.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';

class OrderController implements Controller {
    public path = '/api/order';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/', validateMiddleware(CreateOrderSchema), this.create);
        this.router.get('/', authUserMiddleware, this.getByUser);
        this.router.get('/:id', authUserMiddleware, this.getOrder);
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreateOrderDto = req.body;

            const foundProducts = await ProductModel.find({
                _id: {
                    $in: body.products.map((item) => item.product)
                }
            });

            const products = body.products.map((item) => {
                const currentProduct = foundProducts.find((product) => String(product._id) === item.product);
                if (!currentProduct) {
                    throw new ProductNotFoundException();
                }
                if (currentProduct.quantity - item.count < 0) {
                    throw new ProductQuantityException();
                }
                return {
                    count: item.count,
                    product: {
                        name: currentProduct.name,
                        images: currentProduct.images,
                        sellPrice: currentProduct?.sellPrice,
                        buyPrice: currentProduct.buyPrice,
                        vendorCode: currentProduct?.vendorCode,
                        reference: currentProduct._id
                    }
                };
            });

            const order = await OrderModel.create({
                fullName: body.fullName,
                phone: body.phone,
                comment: body.comment,
                products,
                user: body.user,
                email: body.email,
                status: 'Created',
                address: body.address
            });

            foundProducts.forEach((product) => {
                product.quantity = product.quantity - (body.products.find((item) => item.product === String(product._id))?.count || 0);
                product.save();
            });

            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    private async getByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                throw new UserNotFoundException();
            }

            const orders = await OrderModel.find({ user: user._id });

            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    private async getOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.user;

            if (!user) {
                throw new UserNotFoundException();
            }

            const order = await OrderModel.findById(id);

            if (!order) {
                throw new OrderNotFoundException();
            }

            res.json(order);
        } catch (error) {
            next(error);
        }
    }
}

export default OrderController;
