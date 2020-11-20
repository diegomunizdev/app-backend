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
exports.ValidateUser = void 0;
const user_model_1 = require("../user.data/user.model");
const yup = __importStar(require("yup"));
/**
 * Yup validation field's
 * https://github.com/jquense/yup
 */
exports.ValidateUser = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().required().min(8),
    cpf: yup.string().required(),
    date_of_birth: yup.string().required(),
    type: yup.string().oneOf(Object.values(user_model_1.UserType)).required(),
    phone: yup.string(),
    genre: yup.string()
});
//# sourceMappingURL=user.validator.js.map