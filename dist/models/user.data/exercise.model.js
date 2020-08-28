"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ExerciseSchema = new mongoose_1.default.Schema({
    exercise_monday: { type: String },
    exercise_tuesday: { type: String },
    exercise_wednesday: { type: String },
    exercise_thursday: { type: String },
    exercise_friday: { type: String },
    exercise_saturday: { type: String },
    exercise_sunday: { type: String },
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
const ExerciseModel = mongoose_1.default.model('Exercise', ExerciseSchema);
exports.default = ExerciseModel;
//# sourceMappingURL=exercise.model.js.map