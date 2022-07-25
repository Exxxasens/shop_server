import * as mongoose from 'mongoose';
import { AddressDto } from '../dto/address/address.dto';

const AddressSchema = new mongoose.Schema<AddressDto>({
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    postCode: {
        type: String,
        required: true
    }
});

const AddressModel = mongoose.model('Address', AddressSchema);

export default AddressModel;
