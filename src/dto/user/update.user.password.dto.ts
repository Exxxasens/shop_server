import Joi from 'joi';

export interface UpdateUserPasswordDto {
    password: string;
    newPassword: string;
}

export const UpdateUserPasswordSchema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required()
});
