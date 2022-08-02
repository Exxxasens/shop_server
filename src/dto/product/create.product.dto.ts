import Joi from 'joi';

export interface CreateProductDto {
    name: string;
    description: string;
    shortDescription?: string;
    // TODO: create options model
    show: boolean;
    buyPrice: number;
    sellPrice: number;
    quantity: number;
    vendorCode: string;
    categories: string[];
    properties: string[];
    variants: string[];
}

export const CreateProductSchema = Joi.object<CreateProductDto>({
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
