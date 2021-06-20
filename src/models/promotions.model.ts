import Mongoose from 'mongoose';
import { IPromotions } from './interfaces/promotions.interface';

const PromotionSchema = new Mongoose.Schema<IPromotions>({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    dateStart: {
        type: String,
        required: true
    },
    dateEnd: {
        type: String
    },
    userId: {
        type: String
    }
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

const PromotionModel = Mongoose.model<IPromotions>('Promotions', PromotionSchema);
export default PromotionModel;