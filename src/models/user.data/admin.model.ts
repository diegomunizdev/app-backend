import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IAdmin } from '../interfaces/admin.interface';

export enum UserType {
    ADMIN = 'admin',
    PERSONAL_TRAINER = 'personalTrainer',
    CLIENT = 'client'
}

const AdminSchema = new Mongoose.Schema<IAdmin>({
    name: {
        type: String,
        required: true
    },
    individualRegistration: {
        type: String,
        unique: true,
        min: 10
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
    type: {
        type: String,
        default: 'admin',
        required: true
    },
    phone: {
        type: String,
        unique: true
    },
    totalAdmins: {
        type: Number
    },
    totalClients: {
        type: Number
    },
    totalPersonalsTrainer: {
        type: Number
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
});

AdminSchema.methods.encryptPassword = async function (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

AdminSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password || '');
}

const Admin = Mongoose.model<IAdmin>('Admin', AdminSchema);
export default Admin;