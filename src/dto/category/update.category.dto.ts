import Joi from 'joi';
import { CreateProductDto } from '../product/create.product.dto';

export interface UpdateCategoryDto extends CreateProductDto {}

export const UpdateCategorySchema = Joi.object({
    parent: Joi.string().hex().length(24).allow(null),
    title: Joi.string().required()
});
