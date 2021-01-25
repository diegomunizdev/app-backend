import Mongoose, { Document } from 'mongoose'

export interface IAddress extends Document {
    zip_code: string
    street: string
    complement: string
    number: number
    district: string
    city: string
    state: string
    user_id: string
}

const AddressShcema = new Mongoose.Schema({
    zip_code: { type: String, required: true },
    street: { type: String },
    complement: { type: String },
    number: { type: Number },
    district: { type: String },
    city: { type: String },
    state: { type: String },
    user_id: { type: String }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
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