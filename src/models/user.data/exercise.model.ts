import Mongoose, { Document } from 'mongoose'

export interface IExercise extends Document {
    exerciseMonday: string[],
    exerciseTuesday: string[],
    exerciseWednesday: string[],
    exerciseThursday: string[],
    exerciseFriday: string[],
    exerciseSaturday: string[],
    exerciseSunday: string[],
    exerciseStart: string[],
    exerciseEnd: string[],
    userId: string
}

const ExerciseSchema = new Mongoose.Schema({
    exerciseMonday: { type: Array },
    exerciseTuesday: { type: Array },
    exerciseWednesday: { type: Array },
    exerciseThursday: { type: Array },
    exerciseFriday: { type: Array },
    exerciseSaturday: { type: Array },
    exerciseSunday: { type: Array },
    exerciseStart: { type: Array, required: true },
    exerciseEnd: { type: Array, required: true },
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

const ExerciseModel = Mongoose.model<IExercise>('Exercise', ExerciseSchema)
export default ExerciseModel