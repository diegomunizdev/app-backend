import Mongoose, { Document } from 'mongoose';

const EvaluationSchema = new Mongoose.Schema({
    note: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    descrption: {
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

const EvaluationModel = Mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);
export default EvaluationModel;