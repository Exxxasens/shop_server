import Joi from 'joi';

export interface LoginUserDto {
    email: string;
    password: string;
}

export const LoginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
