import { CreateUserDto } from '../dto/user/create.user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import JwtPayload from '../interfaces/jwt.payload.interface';
import UserDocument from '../interfaces/user.document.interface';
import UserModel from '../models/user.model';
// Exceptions
import UserNotFoundException from '../exceptions/UserNotFoundException';
import WrongCredentialsException from '../exceptions/WrongCredentailsException';
import UserAlreadyRegisteredException from '../exceptions/UserAlreadyRegisteredExeption';
import { LoginUserDto } from '../dto/user/login.user.dto';
import { UserDto } from '../dto/user/user.dto';

class UserService {
    expireTime = process.env.JWT_EXPIRE_TIME || '1d';
    secret = process.env.JWT_SECRET || 'secret';

    public async create({ email, password, name, lastname }: CreateUserDto) {
        if (await UserModel.findOne({ email })) {
            throw new UserAlreadyRegisteredException();
        }
        const hashedPassword = await this.hashPassword(password);
        const createdUser = await UserModel.create({ email, password: hashedPassword, name, lastname });
        // const tokenData = this.generateToken(createdUser);
        return createdUser;
    }

    public async login({ email, password }: LoginUserDto) {
        const foundUser = await UserModel.findOne({ email });

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        const isPasswordMatching = await this.comparePassword(foundUser, password);

        if (!isPasswordMatching) {
            throw new WrongCredentialsException();
        }

        const token = this.generateToken(foundUser);

        return {
            user: foundUser,
            token
        };
    }

    public comparePassword(user: UserDocument, password: string) {
        return bcrypt.compare(password, user.get('password', null, { getters: false }));
    }

    private generateToken(user: UserDto) {
        const payload: JwtPayload = {
            id: user._id
        };

        return jwt.sign(payload, this.secret, { expiresIn: this.expireTime });
    }

    private async hashPassword(password: string) {
        return bcrypt.hash(password, 12);
    }

    public async updatePassword(user: UserDocument, password: string) {
        const hashedPassword = await this.hashPassword(password);
        return user.updateOne({ password: hashedPassword });
    }
}

export default new UserService();
