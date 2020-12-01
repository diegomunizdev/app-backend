import Mongoose, { Document } from 'mongoose'

interface IPhoto extends Document {
    user_id: string
    imagePath: string
}

const ProfilePictureSchema = new Mongoose.Schema({
    user_id: { type: String },
    imagePath: { type: String }
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

const ProfilePhotoModel = Mongoose.model<IPhoto>('Photo', ProfilePictureSchema)
export default ProfilePhotoModel