import { UserDto } from '../dto/user/user.dto';
import { Document } from 'mongoose';

type UserDocument = Document<unknown, any, UserDto> & UserDto;

export default UserDocument;
