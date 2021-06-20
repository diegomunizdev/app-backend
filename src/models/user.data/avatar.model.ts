import { IAvatar } from 'models/interfaces/avatar.interface';
import Mongoose from 'mongoose';

const AvatarSchema = new Mongoose.Schema<IAvatar>({
    contentType: { type: String },
    filename: { type: String },
    size: { type: String },
    data: { type: Buffer },
    downloadLink: { type: String },
    fileId: { type: String },
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

const Avatar = Mongoose.model<IAvatar>('Avatar', AvatarSchema);
export default Avatar;