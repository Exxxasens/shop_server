import { CreateProductDto } from './create.product.dto';

export interface ProductDto extends CreateProductDto {
    _id: string;
    images: string[];
}
