import Joi from 'joi';
import { UserDto } from '../user/user.dto';

export interface CreateOrderDto {
    user?: string | null;
    email: string;
    fullName: string;
    products: {
        count: number;
        product: string;
    }[];
    phone: string;
    comment: string;
    address: {
        region: string;
        city: string;
        street: string;
        postCode: string;
        building: string;
    };
}

export const CreateOrderSchema = Joi.object({
    user: Joi.string().hex().length(24),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    products: Joi.array()
        .items(
            Joi.object({
                count: Joi.number().required(),
                product: Joi.string().hex().length(24).required()
            })
        )
        .min(1),
    phone: Joi.string().required(),
    comment: Joi.string().allow('', null),
    address: Joi.object({
        region: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        postCode: Joi.string().required(),
        building: Joi.string().required()
    })
});
