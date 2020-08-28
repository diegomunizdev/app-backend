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
exports.ValidateMeasure = void 0;
const yup = __importStar(require("yup"));
exports.ValidateMeasure = yup.object().shape({
    weight: yup.number(),
    height: yup.number(),
    chest: yup.number(),
    waist: yup.number(),
    upper_abdomen: yup.number(),
    lower_abdormen: yup.number(),
    hip: yup.number(),
    right_arm: yup.number(),
    left_arm: yup.number(),
    before_right_arm: yup.number(),
    before_left_arm: yup.number(),
    upper_right_thigh: yup.number(),
    upper_left_thigh: yup.number(),
    medium_right_thigh: yup.number(),
    middle_left_thigh: yup.number(),
    right_calf: yup.number(),
    left_calf: yup.number(),
    user_id: yup.string().required()
});
//# sourceMappingURL=measures.validator.js.map