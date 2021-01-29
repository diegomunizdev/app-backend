import Mongoose, { Document } from 'mongoose'

export interface IMeasures extends Document {
    weight: number,
    height: number,
    chest: number,
    waist: number,
    upperAbdomen: number,
    lowerAbdormen: number,
    hip: number,
    rightArm: number,
    leftArm: number,
    beforeRightArm: number,
    beforeLeftArm: number,
    upperRightThigh: number,
    upperLeftThigh: number,
    mediumRightThigh: number,
    middleLeftThigh: number,
    rightCalf: number,
    leftCalf: number,
    nextReview: string,
    userId: string
}

const MeasureSchema = new Mongoose.Schema({
    weight: { type: Number },
    height: { type: Number },
    chest: { type: Number },
    waist: { type: Number },
    upperAbdomen: { type: Number },
    lowerAbdormen: { type: Number },
    hip: { type: Number },
    rightArm: { type: Number },
    leftArm: { type: Number },
    beforeRightArm: { type: Number },
    beforeLeftArm: { type: Number },
    upperRightThigh: { type: Number },
    upperLeftThigh: { type: Number },
    mediumRightThigh: { type: Number },
    middleLeftThigh: { type: Number },
    rightCalf: { type: Number },
    leftCalf: { type: Number },
    nextReview: { type: String, required: true },
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

const MeasureModel = Mongoose.model<IMeasures>('Measures', MeasureSchema)
export default MeasureModel