import { Document } from 'mongoose';

export interface IEvaluation extends Document {
    note: number
    title: string
    description: string
}