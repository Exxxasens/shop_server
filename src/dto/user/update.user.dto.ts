import Joi from 'joi';
import { CreateUserDto } from './create.user.dto';

export interface UpdateUserDto {
    name: string;
    lastname: string;
    email: string;
}

export const UpdateUserSchema = Joi.object({
    name: Joi.string().min(3).max(64).required(),
    lastname: Joi.string().min(3).max(64).required(),
    email: Joi.string().email().required().lowercase()
});
