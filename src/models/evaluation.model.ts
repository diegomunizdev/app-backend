import Mongoose, { Document } from 'mongoose'

export interface IEvaluation extends Document {
    note: number
    title: string
    description: string
}

const EvaluationSchema = new Mongoose.Schema({
    note: { type: Number },
    title: { type: String },
    descrption: { type: String }
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

const EvaluationModel = Mongoose.model<IEvaluation>('Evaluation', EvaluationSchema)
export default EvaluationModel