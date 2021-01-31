import Mongoose, { Document } from 'mongoose'

interface IAvatar extends Document {
    contentType: any
    filename: any
    size: any
    data: Buffer
    downloadLink: any
    userId: any
    fileId: any
}

const AvatarSchema = new Mongoose.Schema({
    contentType: { type: String },
    filename: { type: String },
    size: { type: String },
    data: { type: Buffer },
    downloadLink: { type: String },
    fileId: { type: String },
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

const Avatar = Mongoose.model<IAvatar>('Avatar', AvatarSchema)
export default Avatar