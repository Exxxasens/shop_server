import Joi from 'joi';

export interface CreateCategoryDto {
    parent?: string | null;
    title: string;
}

export const CreateCategorySchema = Joi.object({
    parent: Joi.string().hex().length(24).default('').allow(null),
    title: Joi.string().required()
});
