"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProfilePictureSchema = new mongoose_1.default.Schema({
    user_id: { type: String },
    imagePath: { type: String }
});
const ProfilePhotoModel = mongoose_1.default.model('Photo', ProfilePictureSchema);
exports.default = ProfilePhotoModel;
//# sourceMappingURL=photo.model.js.map