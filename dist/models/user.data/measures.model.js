"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MeasureSchema = new mongoose_1.default.Schema({
    weight: { type: Number },
    height: { type: Number },
    chest: { type: Number },
    waist: { type: Number },
    upper_abdomen: { type: Number },
    lower_abdormen: { type: Number },
    hip: { type: Number },
    right_arm: { type: Number },
    left_arm: { type: Number },
    before_right_arm: { type: Number },
    before_left_arm: { type: Number },
    upper_right_thigh: { type: Number },
    upper_left_thigh: { type: Number },
    medium_right_thigh: { type: Number },
    middle_left_thigh: { type: Number },
    right_calf: { type: Number },
    left_calf: { type: Number },
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
const MeasureModel = mongoose_1.default.model('Measures', MeasureSchema);
exports.default = MeasureModel;
//# sourceMappingURL=measures.model.js.map