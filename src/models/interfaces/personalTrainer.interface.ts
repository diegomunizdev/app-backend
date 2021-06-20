import { UserType } from 'models/user.data/admin.model';
import { Document } from 'mongoose'
import { GenderType } from './admin.interface';

export interface IPersonalTrainer extends Document {
    name: string;
    email: string;
    password?: string;
    individualRegistration: string;
    dateBirth: string;
    type: UserType; //personalTrainer 
    phone: string;
    gender: GenderType; // female or male
    contractStart: string;
    contractEnd: string;
    admission: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}