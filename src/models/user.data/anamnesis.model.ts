import Mongoose, { Document } from 'mongoose'

export interface IAnamnesis extends Document {
    activityObjective: string,
    healthProblems: string,
    medicalTreatment: boolean,
    medicationUse: string,
    diabetes: string,
    arterialHypertension: string,
    arterialHypotension: string,
    smoking: string,
    allergy: string,
    pacemaker: string,
    sittingTime: string,
    standingTime: string,
    prosthesis: string,
    orthosis: string,
    waterDay: string,
    intestinalDisorder: string,
    hormonalDisorder: string,
    nextReview: string,
    userId: string,
}

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

const AnamnesisModel = Mongoose.model<IAnamnesis>('Anamnesis', AnamnesisSchema)
export default AnamnesisModel