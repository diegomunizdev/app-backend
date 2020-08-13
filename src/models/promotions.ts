import Mongoose, { Document } from 'mongoose'

export interface IPromotions extends Document {
    name: string
    value: Number
    date_start: string
    date_end: string
    user_id: string
}

const PromotionSchema = new Mongoose.Schema({
    name: { type: String },
    value: { type: Number },
    date_start: { type: String },
    date_end: { type: String },
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

const PromotionModel = Mongoose.model<IPromotions>('Promotions', PromotionSchema)
export default PromotionModel