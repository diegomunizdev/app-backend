import Mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserType {
    ADMIN = 'admin',
    CLIENT = 'client',
    PERSONAL_TRAINER = 'personal_trainer'
}

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    cpf: string,
    date_of_birth: string,
    type: UserType, // admin, client or personal_trainer
    phone: String,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>
}

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
        min: 11
    },
    date_of_birth: {
        type: String,
        required: true
    },
    type: {
        type: UserType,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
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
}
);

UserSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

const UserModel = Mongoose.model<IUser>('User', UserSchema)
export default UserModel