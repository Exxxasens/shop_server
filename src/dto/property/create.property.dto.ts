import Joi from 'joi';

export interface CreatePropertyDto {
    name: string;
    value: string;
}

export const CreatePropertySchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required()
});
