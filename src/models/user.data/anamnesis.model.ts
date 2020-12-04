import Mongoose, { Document } from 'mongoose'

export interface IAnamnesis extends Document {
    activity_objective: string,
    health_problems: string,
    medical_treatment: boolean,
    medication_use: string,
    diabetes: string,
    arterial_hypertension: string,
    arterial_hypotension: string,
    smoking: string,
    allergy: string,
    pacemaker: string,
    sitting_time: string,
    standing_time: string,
    prosthesis: string,
    orthosis: string,
    water_day: string,
    intestinal_disorder: string,
    hormonal_disorder: string,
    next_review: string,
    user_id: string,
}

const AnamnesisSchema = new Mongoose.Schema({
    activity_objective: { type: String, required: true },
    health_problems: { type: String, required: true },
    medical_treatment: { type: Boolean, required: true },
    medication_use: { type: String },
    diabetes: { type: String },
    arterial_hypertension: { type: String },
    arterial_hypotension: { type: String },
    smoking: { type: String },
    allergy: { type: String },
    pacemaker: { type: String },
    sitting_time: { type: String },
    standing_time: { type: String },
    prosthesis: { type: String },
    orthosis: { type: String },
    water_day: { type: String },
    intestinal_disorder: { type: String },
    hormonal_disorder: { type: String },
    next_review: { type: String, required: true },
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

const AnamnesisModel = Mongoose.model<IAnamnesis>('Anamnesis', AnamnesisSchema)
export default AnamnesisModel