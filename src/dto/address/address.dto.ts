import { CreateAddressDto } from './create.address.dto';

export interface AddressDto extends CreateAddressDto {
    _id: string;
}
