import * as mongoose from 'mongoose';
import { UserDto } from '../dto/user/user.dto';

const UserSchema = new mongoose.Schema<UserDto>(
    {
        email: {
            type: String,
            required: true,
            unique: true
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
        role: {
            type: String,
            required: false,
            enum: ['user', 'admin'],
            default: 'user'
        },
        /*
        orders: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        },
        */
        address: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Address'
            }
        ]
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
