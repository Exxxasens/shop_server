import Joi from 'joi';
import { CreatePropertyDto } from './create.property.dto';

export interface UpdatePropertyDto extends CreatePropertyDto {}

export const UpdatePropertySchema = Joi.object({
    value: Joi.string().required(),
    name: Joi.string().required()
});
