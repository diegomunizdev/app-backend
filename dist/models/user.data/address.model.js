"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AddressShcema = new mongoose_1.default.Schema({
    zip_code: { type: String, required: true },
    name: { type: String },
    complement: { type: String },
    number: { type: String },
    neighborhood: { type: String },
    city: { type: String },
    user_id: { type: String }
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
const AddressModel = mongoose_1.default.model('Address', AddressShcema);
exports.default = AddressModel;
//# sourceMappingURL=address.model.js.map