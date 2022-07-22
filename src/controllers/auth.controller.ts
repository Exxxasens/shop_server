import Controller from '../interfaces/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import { CreateUserDto, CreateUserSchema } from '../dto/user/create.user.dto';
import userService from '../services/user.service';
import { LoginUserSchema, LoginUserDto } from '../dto/user/login.user.dto';
import validateMiddleware from '../middlewares/validate.middleware';

class AuthController implements Controller {
    public path = '/api/user';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/register', validateMiddleware(CreateUserSchema), this.register);
        this.router.post('/login', validateMiddleware(LoginUserSchema), this.login);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user: CreateUserDto = req.body;
            const createdUser = await userService.create(user);

            res.json(createdUser);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: LoginUserDto = req.body;
            const { user, token } = await userService.login({ email, password });
            return res.json({
                user,
                token
            });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
