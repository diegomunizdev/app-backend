import { IExercise } from 'models/interfaces/exercises.interface';
import Mongoose from 'mongoose';

const ExerciseSchema = new Mongoose.Schema<IExercise>({
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

const ExerciseModel = Mongoose.model<IExercise>('Exercise', ExerciseSchema)
export default ExerciseModel