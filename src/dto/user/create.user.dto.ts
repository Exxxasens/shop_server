import * as Joi from 'joi';

export interface CreateUserDto {
    name: string;
    lastname: string;
    email: string;
    password: string;
    role?: string;
}

export const CreateUserSchema = Joi.object<CreateUserDto>({
    name: Joi.string().required().min(3).max(64),
    lastname: Joi.string().required().min(3).max(64),
    email: Joi.string().email().required().min(3).max(64).lowercase(),
    password: Joi.string().required().min(3).max(64),
    role: Joi.string().default('user')
});
