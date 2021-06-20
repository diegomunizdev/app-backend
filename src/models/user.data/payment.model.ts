import { IPayment } from 'models/interfaces/payment.interface';
import Mongoose from 'mongoose';

const PaymentSchema = new Mongoose.Schema<IPayment>({
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

const PaymentModel = Mongoose.model<IPayment>('Payment', PaymentSchema);
export default PaymentModel;
