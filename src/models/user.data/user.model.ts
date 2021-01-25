import Mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserType {
    ADMIN = 'admin',
    CLIENT = 'client',
    PERSONAL_TRAINER = 'personal_trainer'
}

export enum GenderType {
    FEMALE = 'female',
    MALE = 'male'
}

export interface IUser extends Document {
    name: string,
    email: string,
    password: string | undefined,
    individual_registration: string,
    age: number,
    date_of_birth: string,
    type: UserType, // admin, client or personal_trainer
    phone: string,
    gender: GenderType, // female or male
    contract_start: string,
    contract_end: string,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>
}

const UserSchema = new Mongoose.Schema({
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
    individual_registration: {
        type: String,
        unique: true,
        min: 10
    },
    age: {
        type: Number,
        required: true,
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
        unique: true
    },
    gender: {
        type: GenderType
    },
    contract_start: {
        type: String
    },
    contract_end: {
        type: String
    }
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