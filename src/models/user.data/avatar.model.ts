import Mongoose, { Document } from 'mongoose'

interface IAvatar extends Document {
    user_id: string
    avatar: string
}

const AvatarSchema = new Mongoose.Schema({
    user_id: { type: String },
    avatar: { type: String }
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

const Avatar = Mongoose.model<IAvatar>('Avatar', AvatarSchema)
export default Avatar