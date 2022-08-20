import * as mongoose from 'mongoose';
import { CategoryDto } from '../dto/category/category.dto';

const CategorySchema = new mongoose.Schema<CategoryDto>({
    title: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Category',
        default: ''
    }
});

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
