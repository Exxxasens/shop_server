import Joi from 'joi';
import { CreateProductDto } from './create.product.dto';

export interface UpdateProductDto extends CreateProductDto {}

export const UpdateProductSchema = Joi.object<UpdateProductDto>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    shortDescription: Joi.string().required(),
    show: Joi.boolean().required(),
    options: Joi.array().items(Joi.string()),
    isDraft: Joi.boolean().required(),
    categories: Joi.array().items(Joi.string()).required()
});
