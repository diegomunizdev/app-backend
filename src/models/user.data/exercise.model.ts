import Mongoose, { Document } from 'mongoose'

export interface IExercise extends Document {
    exercise_monday: string,
    exercise_tuesday: string,
    exercise_wednesday: string,
    exercise_thursday: string,
    exercise_friday: string,
    exercise_saturday: string,
    exercise_sunday: string,
    user_id: string
}

const ExerciseSchema = new Mongoose.Schema({
    exercise_monday: { type: String },
    exercise_tuesday: { type: String },
    exercise_wednesday: { type: String },
    exercise_thursday: { type: String },
    exercise_friday: { type: String },
    exercise_saturday: { type: String },
    exercise_sunday: { type: String },
    user_id: { type: String }
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

const ExerciseModel = Mongoose.model<IExercise>('Exercise', ExerciseSchema)
export default ExerciseModel