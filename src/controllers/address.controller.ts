import Controller from '../interfaces/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import validateMiddleware from '../middlewares/validate.middleware';
import { UpdateAddressSchema } from '../dto/address/update.address.dto';
import { CreateAddressDto, CreateAddressSchema } from '../dto/address/create.address.dto';
import AddressModel from '../models/address.model';
import AddressNotFoundException from '../exceptions/AddressNotFoundException';
import WrongCredentialsException from '../exceptions/WrongCredentailsException';
import { AddressDto } from '../dto/address/address.dto';
import authUserMiddleware from '../middlewares/auth.user.middleware';

class AddressController implements Controller {
    public path = '/api/user/address';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/', authUserMiddleware, validateMiddleware(CreateAddressSchema), this.create);
        this.router.put('/:id', authUserMiddleware, validateMiddleware(UpdateAddressSchema), this.update);
        this.router.delete('/:id', authUserMiddleware, this.delete);
        this.router.get('/', authUserMiddleware, this.get);
    }

    private async get(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                throw new WrongCredentialsException();
            }
            if (!user.populated('address')) {
                await user.populate('address');
            }

            res.json(user.address);
        } catch (error) {
            next(error);
        }
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createBody: CreateAddressDto = req.body;
            const user = req.user;

            if (!user) {
                throw new WrongCredentialsException();
            }

            const createdAddress = await AddressModel.create(createBody);

            await user.updateOne({
                $addToSet: {
                    address: createdAddress._id
                }
            });

            return res.json(createdAddress);
        } catch (error) {
            next(error);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.user;

            if (!user) {
                throw new WrongCredentialsException();
            }

            if (!user.populated('address')) {
                await user.populate('address');
            }

            const foundAddress = (user.address as AddressDto[]).find((item) => {
                return String(item._id) === String(id);
            });

            if (!foundAddress) {
                throw new AddressNotFoundException();
            }

            await user.updateOne({
                $pull: {
                    address: foundAddress._id
                }
            });

            return res.json(foundAddress);
        } catch (error) {
            next(error);
        }
    }
    // TODO: dev update
    private async update(req: Request, res: Response, next: NextFunction) {}
}

export default AddressController;
