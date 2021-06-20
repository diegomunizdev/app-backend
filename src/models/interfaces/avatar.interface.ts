import { Document } from 'mongoose';

export interface IAvatar extends Document {
    contentType: any;
    filename: any;
    size: any;
    data: Buffer;
    downloadLink: any;
    userId: any;
    fileId: any;
}