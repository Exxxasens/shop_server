import Controller from '../interfaces/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import WrongCredentialsException from '../exceptions/WrongCredentailsException';
import UserModel from '../models/user.model';
import { UpdateUserPasswordDto, UpdateUserPasswordSchema } from '../dto/user/update.user.password.dto';
import userService from '../services/user.service';
import validateMiddleware from '../middlewares/validate.middleware';
import { UpdateUserDto, UpdateUserSchema } from '../dto/user/update.user.dto';
import authUserMiddleware from '../middlewares/auth.user.middleware';

import * as bcrypt from 'bcrypt';

class UserController implements Controller {
    public path = '/api/user';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', authUserMiddleware, this.getCurrentUser);
        this.router.put('/', authUserMiddleware, validateMiddleware(UpdateUserSchema), this.update);
        this.router.put('/password', authUserMiddleware, validateMiddleware(UpdateUserPasswordSchema), this.updatePassword);
    }

    async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                throw new WrongCredentialsException();
            }

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const update: UpdateUserDto = req.body;
            const user = req.user;

            if (!user) {
                throw new WrongCredentialsException();
            }

            const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, update, { new: true });

            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { password, newPassword }: UpdateUserPasswordDto = req.body;
            const user = req.user;

            if (!user) {
                throw new WrongCredentialsException();
            }

            if (!(await userService.comparePassword(user, password))) {
                throw new WrongCredentialsException();
            }

            const updatedUser = await userService.updatePassword(user, newPassword);

            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
