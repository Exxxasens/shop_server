import { CreateAddressDto } from './create.address.dto';

export interface AddressDto extends CreateAddressDto {
    _id: string;
    city: string;
    street: string;
    buildingNumber: string;
    postCode: string;
}