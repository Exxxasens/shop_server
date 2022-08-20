import { Router, Request, Response, NextFunction } from 'express';
import { CreateCategoryDto, CreateCategorySchema } from '../dto/category/create.category.dto';
import { UpdateCategoryDto, UpdateCategorySchema } from '../dto/category/update.category.dto';
import CategoryNotFoundException from '../exceptions/CategoryNotFoundException';
import Controller from '../interfaces/controller.interface';
import authAdminMiddleware from '../middlewares/auth.admin.middleware';
import validateMiddleware from '../middlewares/validate.middleware';
import CategoryModel from '../models/category.model';

class CategoryController implements Controller {
    public path = '/api/category';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/:id', this.getById);
        this.router.get('/', this.getCategories);
        this.router.post('/', authAdminMiddleware, validateMiddleware(CreateCategorySchema), this.create);
        this.router.put('/:id', authAdminMiddleware, validateMiddleware(UpdateCategorySchema), this.update);
        this.router.delete('/:id', authAdminMiddleware, this.delete);
    }

    private async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await CategoryModel.find({});
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    private async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findById(id);

            if (!category) {
                throw new CategoryNotFoundException();
            }

            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createBody: CreateCategoryDto = req.body;
            const category = await CategoryModel.create(createBody);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findById(id);
            if (!category) {
                throw new CategoryNotFoundException();
            }
            await category.remove();
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    private async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const update: UpdateCategoryDto = req.body;
            const category = await CategoryModel.findOneAndUpdate({ _id: id }, update, { new: true });
            if (!category) {
                throw new CategoryNotFoundException();
            }
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
}

export default CategoryController;
