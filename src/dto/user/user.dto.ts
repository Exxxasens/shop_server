import { AddressDto } from '../address/address.dto';
import { CreateUserDto } from './create.user.dto';
import mongoose from 'mongoose';

export interface UserDto extends CreateUserDto {
    _id: string;
    phone: string;
    address: mongoose.Types.ObjectId | AddressDto[];
    // orders: mongoose.Types.ObjectId | OrderDto[];
    // cart: CartDto
}
