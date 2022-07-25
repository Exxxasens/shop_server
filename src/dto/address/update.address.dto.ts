import Joi from 'joi';
import { CreateAddressDto } from './create.address.dto';

export interface UpdateAddressDto extends CreateAddressDto {}

export const UpdateAddressSchema = Joi.object<CreateAddressDto>({
    region: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    building: Joi.string().required(),
    postCode: Joi.string().required()
});
