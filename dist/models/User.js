"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "admin";
    UserType["CLIENT"] = "client";
    UserType["PERSONAL_TRAINER"] = "personal_trainer";
})(UserType = exports.UserType || (exports.UserType = {}));
const UserSchema = new mongoose_1.default.Schema({
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
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
UserSchema.methods.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    return bcrypt_1.default.hash(password, salt);
});
UserSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=User.js.map