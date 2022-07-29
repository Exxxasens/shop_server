import { CreatePropertyDto } from './create.property.dto';

export interface PropertyDto extends CreatePropertyDto {
    _id: string;
}
