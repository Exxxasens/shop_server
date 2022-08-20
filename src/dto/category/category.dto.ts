import { CreateCategoryDto } from './create.category.dto';

export interface CategoryDto extends CreateCategoryDto {
    _id: string;
}
