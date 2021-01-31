import Mongoose, { Document } from 'mongoose'

export interface IPromotions extends Document {
    title: string
    subtitle: string
    value: number
    dateStart: string
    dateEnd: string
    userId: string
}

const PromotionSchema = new Mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    value: { type: Number },
    dateStart: { type: String },
    dateEnd: { type: String },
    userId: { type: String }
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

const PromotionModel = Mongoose.model<IPromotions>('Promotions', PromotionSchema)
export default PromotionModel