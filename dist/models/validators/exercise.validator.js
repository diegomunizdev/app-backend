"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateExercise = void 0;
const yup = __importStar(require("yup"));
exports.ValidateExercise = yup.object().shape({
    exercise_monday: yup.string(),
    exercise_tuesday: yup.string(),
    exercise_wednesday: yup.string(),
    exercise_thursday: yup.string(),
    exercise_friday: yup.string(),
    exercise_saturday: yup.string(),
    exercise_sunday: yup.string(),
    user_id: yup.string().required()
});
//# sourceMappingURL=exercise.validator.js.map