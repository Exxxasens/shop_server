import Joi from 'joi';
import { CreateOptionDto } from './create.option.dto';

export interface UpdateOption extends CreateOptionDto {}

export const UpdateOptionSchema = Joi.object({
    value: Joi.string().required(),
    name: Joi.string().required()
});
