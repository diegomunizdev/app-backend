import { Document } from 'mongoose';

export interface IAddress extends Document {
    zipCode?: string;
    street?: string;
    complement?: string;
    number?: number;
    district?: string;
    city?: string;
    state?: string;
    userId?: string;
}