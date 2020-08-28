"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AnamnesisSchema = new mongoose_1.default.Schema({
    diabetes: { type: String },
    arterial_hypertension: { type: String },
    arterial_hypotension: { type: String },
    smoking: { type: String },
    allergy: { type: String },
    medical_treatment: { type: String },
    medication_use: { type: String },
    heart_problem: { type: String },
    pacemaker: { type: String },
    sitting_time: { type: String },
    standing_time: { type: String },
    prosthesis: { type: String },
    orthosis: { type: String },
    water_day: { type: String },
    intestinal_disorder: { type: String },
    hormonal_disorder: { type: String },
    user_id: { type: String, required: true }
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
const AnamnesisModel = mongoose_1.default.model('Anamnesis', AnamnesisSchema);
exports.default = AnamnesisModel;
//# sourceMappingURL=anamnesis.model.js.map