import { IMeasures } from 'models/interfaces/measures.interface';
import Mongoose from 'mongoose';

const MeasureSchema = new Mongoose.Schema<IMeasures>({
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

const MeasureModel = Mongoose.model<IMeasures>('Measures', MeasureSchema)
export default MeasureModel