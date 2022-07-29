import { CreateProductDto } from './create.product.dto';
import { ProductVariantDto } from './variant/product.variant.dto';

export interface ProductDto extends CreateProductDto {
    _id: string;
    variants: ProductVariantDto[];
}
