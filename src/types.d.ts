import UserDocument from './interfaces/user.document.interface';

declare global {
    namespace Express {
        interface User extends UserDocument {}
    }
}

export {};
