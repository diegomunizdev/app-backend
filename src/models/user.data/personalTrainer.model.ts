import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IPersonalTrainer } from '../interfaces/personalTrainer.interface';
import { UserType } from './admin.model';

const PersonalSchema = new Mongoose.Schema<IPersonalTrainer>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        min: 6,
        required: true,
        select: false
    },
    individualRegistration: {
        type: String,
        unique: true,
        min: 10
    },
    dateBirth: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true
    },
    type: {
        type: UserType,
        default: 'client',
        required: true
    },
    gender: {
        type: String
    },
    contractStart: {
        type: String
    },
    contractEnd: {
        type: String
    },
    admission: {
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

PersonalSchema.methods.encryptPassword = async function (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

PersonalSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password || '');
}

const PersonalTrainer = Mongoose.model<IPersonalTrainer>('PersonalTrainer', PersonalSchema)
export default PersonalTrainer;