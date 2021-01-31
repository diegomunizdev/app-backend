import Mongoose, { Document } from 'mongoose'
import MeasureModel from './measures.model'

export interface IPayment extends Document {
    value: number,
    userId: string
}

const PaymentSchema = new Mongoose.Schema({
    value: { type: String },
    userId: { type: String, required: true }
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

const PaymentModel = Mongoose.model<IPayment>('Payment', PaymentSchema)
export default PaymentModel
