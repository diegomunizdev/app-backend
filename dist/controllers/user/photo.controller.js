"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhoto = exports.updatePhoto = exports.getPhoto = exports.createPhoto = void 0;
const photo_model_1 = __importDefault(require("../../models/user.data/photo.model"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const response_1 = require("../../middlewares/response");
exports.createPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const myPhoto = {
            user_id: user_id,
            imagePath: req.file.path
        };
        if (!myPhoto.user_id)
            response_1.responseError(res, 'User not found', 404);
        const photo = new photo_model_1.default(myPhoto);
        yield photo.save();
        response_1.responseSuccess(res, photo, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield photo_model_1.default.findOne({ user_id: req.params.userId });
        if (!userId)
            response_1.responseError(res, 'Photo not found', 404);
        response_1.responseSuccess(res, userId, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.updatePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photo = yield photo_model_1.default.findOne({ user_id: req.params.userId });
        if (!photo)
            response_1.responseError(res, 'Photo not found', 404);
        const pht = {
            user_id: photo === null || photo === void 0 ? void 0 : photo.user_id,
            imagePath: req.file.path
        };
        yield photo_model_1.default.findByIdAndUpdate(photo === null || photo === void 0 ? void 0 : photo.id, {
            $set: pht
        }, { new: true });
        response_1.responseSuccess(res, pht, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.deletePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photo = yield photo_model_1.default.findOne({ user_id: req.params.userId });
        if (!photo)
            response_1.responseError(res, 'Photo not found', 404);
        const pht = yield photo_model_1.default.findByIdAndRemove(photo === null || photo === void 0 ? void 0 : photo.id);
        if (pht) {
            fs_extra_1.default.unlink(path_1.default.resolve(pht.imagePath));
        }
        response_1.responseSuccess(res, 'Photo successfully removed', 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=photo.controller.js.map