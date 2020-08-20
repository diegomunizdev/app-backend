import Mongoose, { Document } from 'mongoose'

export interface IAddress extends Document {
    zip_code: string
    name: string
    complement: string
    number: string
    neighborhood: string
    city: string
    user_id: string
}

const AddressShcema = new Mongoose.Schema({
    zip_code: { type: String, required: true },
    name: { type: String },
    complement: { type: String },
    number: { type: String },
    neighborhood: { type: String },
    city: { type: String },
    user_id: { type: String }
},{
    timestamps: { createdAt: 'created_at', updatedAt: false },
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