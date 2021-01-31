import { Document } from 'mongoose'

export enum GenderType {
    FEMALE = 'female',
    MALE = 'male'
}

export interface IAdmin extends Document {
    name?: string
    individualRegistration?: string
    email?: string
    password?: string
    dateBirth?: string
    type?: string // admin
    phone?: string
    totalAdmins?: number
    totalClients?: number
    totalPersonalsTrainer?: number
    encryptPassword(password: string): Promise<string>
    validatePassword(password: string): Promise<boolean>
}