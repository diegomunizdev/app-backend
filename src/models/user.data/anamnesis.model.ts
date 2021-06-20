import { IAnamnesis } from 'models/interfaces/anamnesis.interface'
import Mongoose from 'mongoose'

const AnamnesisSchema = new Mongoose.Schema({
    activityObjective: { type: String, required: true },
    healthProblems: { type: String, required: true },
    medicalTreatment: { type: Boolean, required: true },
    medicationUse: { type: String },
    diabetes: { type: String },
    arterialHypertension: { type: String },
    arterialHypotension: { type: String },
    smoking: { type: String },
    allergy: { type: String },
    pacemaker: { type: String },
    sittingTime: { type: String },
    standingTime: { type: String },
    prosthesis: { type: String },
    orthosis: { type: String },
    waterDay: { type: String },
    intestinalDisorder: { type: String },
    hormonalDisorder: { type: String },
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

const AnamnesisModel = Mongoose.model<IAnamnesis>('Anamnesis', AnamnesisSchema)
export default AnamnesisModel