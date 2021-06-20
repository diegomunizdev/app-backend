import {Document} from 'mongoose';

export interface IPayment extends Document {
    value: number;
    userId: string;
}