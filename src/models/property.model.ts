import * as mongoose from 'mongoose';
import { PropertyDto } from '../dto/property/property.dto';

const PropertySchema = new mongoose.Schema<PropertyDto>({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const PropertyModel = mongoose.model('Property', PropertySchema);

export default PropertyModel;
