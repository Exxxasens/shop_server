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
    price: {
        type: Number,
        required: true
    },
    options: [String],
    show: {
        type: Boolean,
        required: true
    },
    isDraft: {
        type: Boolean,
        required: true
    },
    categories: [String]
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
