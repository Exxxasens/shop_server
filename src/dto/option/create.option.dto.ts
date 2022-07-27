import Joi from 'joi';

export interface CreateOptionDto {
    value: string;
    name: string;
}

export const CreateOptionSchema = Joi.object({
    value: Joi.string().required(),
    name: Joi.string().required()
});
