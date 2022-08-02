import Joi from 'joi';
import { CreateProductDto } from './create.product.dto';

export interface UpdateProductDto extends CreateProductDto {}

export const UpdateProductSchema = Joi.object<UpdateProductDto>({
    name: Joi.string().default(''),
    description: Joi.string().default(''),
    shortDescription: Joi.string().default(''),
    show: Joi.boolean().default(false),
    buyPrice: Joi.number().default(0),
    sellPrice: Joi.number().default(0),
    vendorCode: Joi.string().default(''),
    quantity: Joi.number().default(0),
    categories: Joi.array().items(Joi.string().hex().length(24)).default([]),
    properties: Joi.array().items(Joi.string().hex().length(24)).default([]),
    variants: Joi.array().items(Joi.string().hex().length(24)).default([])
});
