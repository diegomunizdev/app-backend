import { Document } from 'mongoose';

export interface IPromotions extends Document {
    title?: string;
    subtitle?: string;
    value?: string;
    dateStart?: string;
    dateEnd?: string;
    userId?: string;
}