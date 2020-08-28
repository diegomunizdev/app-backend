"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EvaluationSchema = new mongoose_1.default.Schema({
    note: { type: Number },
    title: { type: String },
    descrption: { type: String }
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
const EvaluationModel = mongoose_1.default.model('Evaluation', EvaluationSchema);
exports.default = EvaluationModel;
//# sourceMappingURL=evaluation.model.js.map