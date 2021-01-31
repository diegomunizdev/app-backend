import { Document } from 'mongoose'

export interface IClient extends Document {
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
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>
}