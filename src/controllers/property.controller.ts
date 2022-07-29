import { NextFunction, Router, Request, Response } from 'express';
import { CreatePropertyDto, CreatePropertySchema } from '../dto/property/create.property.dto';
import PropertyAlreadyExistsException from '../exceptions/PropertyAlreadyExistsException';
import PropertyNotFoundException from '../exceptions/PropertyNotFoundException';
import authAdminMiddleware from '../middlewares/auth.admin.middleware';
import authUserMiddleware from '../middlewares/auth.user.middleware';
import PropertyModel from '../models/property.model';
import Controller from '../interfaces/controller.interface';
import validateMiddleware from '../middlewares/validate.middleware';
import { CreateProductDto } from '../dto/product/create.product.dto';

class PropertyController implements Controller {
    public path = '/api/property';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.delete('/:id', authUserMiddleware, this.delete);
        this.router.post('/', authAdminMiddleware, validateMiddleware(CreatePropertySchema), this.create);
        this.router.get('/', authAdminMiddleware, this.get);
    }

    private async get(req: Request, res: Response, next: NextFunction) {
        try {
            const property = await PropertyModel.find({});
            res.json(property);
        } catch (error) {
            next(error);
        }
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, value }: CreatePropertyDto = req.body;

            const foundProperty = await PropertyModel.findOne({ name, value });

            if (foundProperty) {
                throw new PropertyAlreadyExistsException();
            }

            const property = await PropertyModel.create({ name, value });

            res.json(property);
        } catch (error) {
            next(error);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const property = await PropertyModel.findById(id);

            if (!property) {
                throw new PropertyNotFoundException();
            }

            await property.delete();

            res.json(property);
        } catch (error) {
            next(error);
        }
    }
}

export default PropertyController;
