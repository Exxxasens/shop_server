import * as mongoose from 'mongoose';
import { OrderDto } from '../dto/order/order.dto';

const OrderSchema = new mongoose.Schema<OrderDto>(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: false
        },
        products: [
            {
                count: Number,
                product: {
                    name: String,
                    images: [String],
                    sellPrice: {
                        type: Number,
                        default: 0,
                        required: true
                    },
                    buyPrice: {
                        type: Number,
                        default: 0,
                        required: true
                    },
                    vendorCode: {
                        type: String,
                        default: ''
                    },
                    reference: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product'
                    }
                }
            }
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['Created', 'Canceled', 'Delivered', 'Shipped']
        },
        address: {
            region: String,
            city: String,
            street: String,
            postCode: String,
            building: String
        }
    },
    { timestamps: true }
);

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;
