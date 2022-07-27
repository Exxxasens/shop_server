import Controller from '../interfaces/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import validateMiddleware from '../middlewares/validate.middleware';
import authAdminMiddleware from '../middlewares/auth.admin.middleware';
import ProductModel from '../models/product.mode';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import { CreateProductSchema, CreateProductDto } from '../dto/product/create.product.dto';
import { UpdateProductDto, UpdateProductSchema } from '../dto/product/update.product.dto';

class ProductController implements Controller {
    public path = '/api/product';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', this.get);
        this.router.get('/:id', this.getById);
        // admin routes
        this.router.delete('/:id', authAdminMiddleware, this.delete);
        this.router.post('/', authAdminMiddleware, validateMiddleware(CreateProductSchema), this.create);
        this.router.put('/', authAdminMiddleware, validateMiddleware(UpdateProductSchema), this.update);
    }

    private async get(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductModel.find({});
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    private async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreateProductDto = req.body;
            console.log(body);
            const product = await ProductModel.create(body);
            return res.json(product);
        } catch (error) {
            next(error);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const product = await ProductModel.findOne({ _id: id });

            if (!product) {
                throw new ProductNotFoundException();
            }

            await product.delete();

            return res.json(product);
        } catch (error) {
            next(error);
        }
    }

    private async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const update: UpdateProductDto = req.body;
            const updatedProduct = await ProductModel.findOneAndUpdate({ _id: id }, update, { new: true });

            if (!updatedProduct) {
                throw new ProductNotFoundException();
            }

            return res.json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;
