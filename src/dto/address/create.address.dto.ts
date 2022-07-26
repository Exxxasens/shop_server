import Joi from 'joi';

export interface CreateAddressDto {
    region: string;
    city: string;
    street: string;
    building: string;
    postCode: string;
}

export const CreateAddressSchema = Joi.object<CreateAddressDto>({
    region: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    building: Joi.string().required(),
    postCode: Joi.string().required()
});
