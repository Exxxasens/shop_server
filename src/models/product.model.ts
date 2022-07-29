import * as mongoose from 'mongoose';
import { ProductDto } from '../dto/product/product.dto';

const ProductSchema = new mongoose.Schema<ProductDto>({
    name: {
        type: String,
        default: ''
    },
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
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    vendorCode: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    isDraft: {
        type: Boolean,
        required: true
    },
    properties: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],
    categories: [String],
    variants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
