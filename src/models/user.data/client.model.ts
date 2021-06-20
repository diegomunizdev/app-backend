import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IClient } from 'models/interfaces/client.interface';
import { UserType } from './admin.model';
import { GenderType } from 'models/interfaces/admin.interface';

const ClientSchema = new Mongoose.Schema<IClient>({
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
        min: 8,
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
        type: GenderType,
        required: true
    },
    contractStart: {
        type: String
    },
    contractEnd: {
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
}
);

ClientSchema.methods.encryptPassword = async function (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

ClientSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password || '');
}

const Client = Mongoose.model<IClient>('Client', ClientSchema);
export default Client;