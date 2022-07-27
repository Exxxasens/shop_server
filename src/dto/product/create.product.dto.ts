import Joi from 'joi';

export interface CreateProductDto {
    name: string;
    description: string;
    shortDescription?: string;
    price: number;
    // TODO: create options model
    options: string[];
    show: boolean;
    isDraft: boolean;
    categories: string[];
}

export const CreateProductSchema = Joi.object<CreateProductDto>({
    name: Joi.string().default(''),
    description: Joi.string().default(''),
    shortDescription: Joi.string().default(''),
    price: Joi.number().default(0),
    show: Joi.boolean().default(false),
    options: Joi.array().items(Joi.string()).default([]),
    isDraft: Joi.boolean().default(true),
    categories: Joi.array().items(Joi.string()).default([])
});
