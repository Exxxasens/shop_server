import { Router, Response, Request, NextFunction } from "express";
import { CategoryDto } from "../dto/category/category.dto";
import CategoryNotFoundException from "../exceptions/CategoryNotFoundException";
import Controller from "../interfaces/controller.interface";
import CategoryModel from "../models/category.model";
import ProductModel from "../models/product.model";

class FilterController implements Controller {

    public path = '/api/filter';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/:category', this.getFilter);
    }

    private async getFilter(req: Request, res: Response, next: NextFunction) {
        try {
            const { category } = req.params;

            const foundCategory = await CategoryModel.findById(category);

            if (!foundCategory) {
                throw new CategoryNotFoundException();
            }

            const filter = await ProductModel.aggregate([
                { $match: { categories: foundCategory._id } },
                {
                    $lookup: {
                        from: 'properties', as: 'properties_doc', localField: 'properties', foreignField: '_id'
                    }
                },
                { $unwind: "$properties_doc" },
                {
                    $group: {
                        _id: "$properties_doc.name",
                        "values": {
                            $addToSet: "$properties_doc.value"
                        }
                    }
                }
            ])
            res.json(filter);
        } catch (error) {
            next(error);
        }
    }

}

export default FilterController;