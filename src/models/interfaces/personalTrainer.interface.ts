import { Document } from 'mongoose'
import { GenderType } from './admin.interface';

export interface IPersonalTrainer extends Document {
    name: string,
    email: string,
    password: string | undefined,
    individualRegistration: string,
    dateBirth: string,
    type: string,
    phone: string,
    gender: string, // female or male
    contractStart: string,
    contractEnd: string,
    admission: string
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>
}