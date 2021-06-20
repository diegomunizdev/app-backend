import { UserType } from 'models/user.data/admin.model';
import { Document } from 'mongoose'
import { GenderType } from './admin.interface';

export interface IClient extends Document {
    name: string;
    email: string;
    password?: string;
    individualRegistration: string;
    dateBirth: string;
    type: UserType; // client
    phone: string;
    gender: GenderType; // female or male
    contractStart: string;
    contractEnd: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}