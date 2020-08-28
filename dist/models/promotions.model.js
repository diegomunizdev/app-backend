"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PromotionSchema = new mongoose_1.default.Schema({
    title: { type: String },
    subtitle: { type: String },
    value: { type: Number },
    date_start: { type: String },
    date_end: { type: String },
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
const PromotionModel = mongoose_1.default.model('Promotions', PromotionSchema);
exports.default = PromotionModel;
//# sourceMappingURL=promotions.model.js.map