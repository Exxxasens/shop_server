import * as mongoose from 'mongoose';
import { OptionDto } from '../dto/option/option.dto';

const OptionSchema = new mongoose.Schema<OptionDto>({
    value: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const OptionModel = mongoose.model('Option', OptionSchema);

export default OptionModel;
