import * as mongoose from 'mongoose';
import { UserDto } from '../dto/user/user.dto';
import { AddressDto } from '../dto/address/address.dto';

const UserAddressSchema = new mongoose.Schema<AddressDto>({
    city: String,
    street: String,
    buildingNumber: String,
    postCode: String
});

const UserSchema = new mongoose.Schema<UserDto>(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: ''
        }
        /*
        orders: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        },
        address: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }]
        */
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);
/*

userSchema.virtual('posts', {
    ref: 'Device',
    localField: '_id',
    foreignField: 'owner',
  });
  
*/

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
