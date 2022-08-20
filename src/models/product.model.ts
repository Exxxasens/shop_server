import * as mongoose from 'mongoose';
import { ProductDto } from '../dto/product/product.dto';

const ProductSchema = new mongoose.Schema<ProductDto>({
    name: {
        type: String,
        default: ''
    },
    images: [String],
    description: {
        type: String,
        default: ''
    },
    shortDescription: {
        type: String,
        default: ''
    },
    show: {
        type: Boolean,
        default: false,
        required: true
    },
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
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    properties: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],
    categories: [        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    variants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
