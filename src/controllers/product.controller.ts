import Controller from '../interfaces/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import validateMiddleware from '../middlewares/validate.middleware';
import authAdminMiddleware from '../middlewares/auth.admin.middleware';
import ProductModel from '../models/product.model';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import { CreateProductSchema, CreateProductDto } from '../dto/product/create.product.dto';
import { UpdateProductDto, UpdateProductSchema } from '../dto/product/update.product.dto';
import FileStorage from '../multer';
import ImageRequiredException from '../exceptions/ImageRequiredException';
import ImageNotFoundException from '../exceptions/ImageNotFoundException';

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
        this.router.put('/:id', authAdminMiddleware, validateMiddleware(UpdateProductSchema), this.update);
        this.router.post('/:productId/image', authAdminMiddleware, FileStorage.multer.single('image'), this.uploadImage);
        this.router.delete('/:productId/image/:imageName', authAdminMiddleware, this.deleteImage);
    }

    private async get(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductModel.find({}).populate('properties').populate("categories");
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    private async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id).populate('properties').populate("categories");
            if (!product) {
                throw new ProductNotFoundException();
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreateProductDto = req.body;
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
            console.log('ERROR HERE');
            next(error);
        }
    }

    private async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            const image = req.file;

            const { productId } = req.params;
            if (!image) {
                throw new ImageRequiredException();
            }

            const product = await ProductModel.findOneAndUpdate(
                { _id: productId },
                {
                    $addToSet: {
                        images: image.filename
                    }
                }
            );

            if (!product) {
                throw new ProductNotFoundException();
            }

            res.json(image);
        } catch (error) {
            next(error);
        }
    }

    private async deleteImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { productId, imageName } = req.params;

            const product = await ProductModel.findById(productId);

            if (!product) {
                throw new ProductNotFoundException();
            }

            const image = product.images.find((item) => item === imageName);

            if (!image) {
                return next(new ImageNotFoundException());
            }

            const updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: productId },
                {
                    $pull: {
                        images: imageName
                    }
                },
                { new: true }
            );

            res.json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;

/*

{
    properties: [{ type: "color", value: "red", _id: string.... }, { type: "color", value: "red"}] 
    options: [
        {  }
    ]

    PropertyModel = {
        type: "color",
        "value": "red"
    }

    properties = {
        "color": [
            "red",
            "black"
        ],
        "size": [
            "1",
            "2"
        ]
    }



}




*/
