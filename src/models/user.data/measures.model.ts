import Mongoose, { Document } from 'mongoose'

export interface IMeasures extends Document {
    weight: number,
    height: number,
    chest: number,
    waist: number,
    upper_abdomen: number,
    lower_abdormen: number,
    hip: number,
    right_arm: number,
    left_arm: number,
    before_right_arm: number,
    before_left_arm: number,
    upper_right_thigh: number,
    upper_left_thigh: number,
    medium_right_thigh: number,
    middle_left_thigh: number,
    right_calf: number,
    left_calf: number,
    user_id: string
}

const MeasureSchema = new Mongoose.Schema({
    weight: { type: Number },
    height: { type: Number },
    chest: { type: Number },
    waist: { type: Number },
    upper_abdomen: { type: Number },
    lower_abdormen: { type: Number },
    hip: { type: Number },
    right_arm: { type: Number },
    left_arm: { type: Number },
    before_right_arm: { type: Number },
    before_left_arm: { type: Number },
    upper_right_thigh: { type: Number },
    upper_left_thigh: { type: Number },
    medium_right_thigh: { type: Number },
    middle_left_thigh: { type: Number },
    right_calf: { type: Number },
    left_calf: { type: Number },
    user_id: { type: String, required: true }
}, {
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

const MeasureModel = Mongoose.model<IMeasures>('Measures', MeasureSchema)
export default MeasureModel