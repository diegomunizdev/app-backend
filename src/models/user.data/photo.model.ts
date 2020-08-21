import Mongoose, { Document } from 'mongoose'

interface IPhoto extends Document {
    user_id: string
    imagePath: string
}

const ProfilePictureSchema = new Mongoose.Schema({
    user_id: { type: String },
    imagePath: { type: String }
})

const ProfilePhotoModel = Mongoose.model<IPhoto>('Photo', ProfilePictureSchema)
export default ProfilePhotoModel