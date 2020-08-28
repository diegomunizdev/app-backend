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
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            username: req.body.username
        }).select('+password');
        if (!user)
            response_1.responseError(res, 'Invalid username or password', 400);
        const correctPassword = yield (user ? user.validatePassword(req.body.password) : false);
        if (!correctPassword)
            response_1.responseError(res, 'Invalid password', 400);
        const token = jsonwebtoken_1.default.sign({ id: user ? user._id : '', type: user ? user.type : '' }, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: '7d'
        });
        if (!token)
            response_1.responseSuccess(res, 'Token was not provider', 400);
        user ? user.password = undefined : '';
        // TODO: conferir se é necessário retornar o .json({ status: 200, Authorization: token })
        res.header('Authorization', token).json({ status: 200, Authorization: token });
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.forgot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user)
            response_1.responseError(res, 'User not found in the database', 404);
        response_1.responseSuccess(res, user, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield user_model_1.default.findById(req.params.userId);
        if (!userId)
            response_1.responseError(res, 'User not found', 404);
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
        response_1.responseSuccess(res, user, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=auth.controller.js.map