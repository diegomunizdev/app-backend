import Mongoose from 'mongoose';

import { IAddress } from '../interfaces/address.interface';

const AddressShcema = new Mongoose.Schema<IAddress>({
    zipCode: { type: String, required: true },
    street: { type: String },
    complement: { type: String },
    number: { type: Number },
    district: { type: String },
    city: { type: String },
    state: { type: String },
    userId: { type: String, required: true }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            return ret
        }
    }
})

const AddressModel = Mongoose.model<IAddress>('Address', AddressShcema)
export default AddressModel