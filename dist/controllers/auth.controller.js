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
exports.changePassword = exports.forgot = exports.signin = void 0;
const user_model_1 = __importDefault(require("../models/user.data/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_1 = require("../middlewares/response");
const http_status_1 = require("../middlewares/http.status");
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            username: req.body.username
        }).select('+password');
        if (!user)
            response_1.responseError(res, 'Invalid username or password', http_status_1.HttpStatus.BAD_REQUEST);
        const correctPassword = yield (user ? user.validatePassword(req.body.password) : false);
        if (!correctPassword)
            response_1.responseError(res, 'Invalid password', http_status_1.HttpStatus.BAD_REQUEST);
        const token = jsonwebtoken_1.default.sign({ id: user ? user._id : '', type: user ? user.type : '' }, process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'zzz', {
            expiresIn: '7d'
        });
        if (!token)
            response_1.responseSuccess(res, 'Token was not provider', http_status_1.HttpStatus.BAD_REQUEST);
        user ? user.password = undefined : '';
        res.header('Authorization', token).json({ status: http_status_1.HttpStatus.OK, Authorization: token });
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.forgot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user)
            response_1.responseError(res, 'User not found in the database', http_status_1.HttpStatus.NOT_FOUND);
        response_1.responseSuccess(res, user, http_status_1.HttpStatus.OK);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield user_model_1.default.findById(req.params.userId);
        if (!userId)
            response_1.responseError(res, 'User not found', http_status_1.HttpStatus.NOT_FOUND);
        const user = {
            email: req.body.email,
            password: req.body.password,
            encryptPassword: (password) => __awaiter(void 0, void 0, void 0, function* () {
                password = req.body.password;
                const salt = yield bcrypt_1.default.genSalt(10);
                return bcrypt_1.default.hash(password, salt);
            })
        };
        user.password = yield user.encryptPassword(user.password ? user.password : '');
        yield user_model_1.default.findByIdAndUpdate(userId, {
            $set: user
        }, { new: true });
        user.password = undefined;
        response_1.responseSuccess(res, user, http_status_1.HttpStatus.OK);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=auth.controller.js.map