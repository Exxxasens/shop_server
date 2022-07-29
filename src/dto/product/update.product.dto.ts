import Joi from 'joi';
import { CreateProductDto } from './create.product.dto';

export interface UpdateProductDto extends CreateProductDto {}

export const UpdateProductSchema = Joi.object<UpdateProductDto>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    shortDescription: Joi.string().required(),
    show: Joi.boolean().required(),
    isDraft: Joi.boolean().required(),
    buyPrice: Joi.number().required(),
    sellPrice: Joi.number().required(),
    vendorCode: Joi.string().required(),
    quantity: Joi.number().required(),
    categories: Joi.array().items(Joi.string().hex().length(24)),
    properties: Joi.array().items(Joi.string().hex().length(24)),
    variants: Joi.array().items(Joi.string().hex().length(24))
});
