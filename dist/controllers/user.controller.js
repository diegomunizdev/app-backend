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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUsersByType = exports.getByUserId = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.data/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pagination_controller_1 = require("./pagination.controller");
const response_1 = require("../middlewares/response");
const user_validator_1 = require("../validators/user.validator");
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default(req.body);
        if (!user)
            response_1.responseError(res, 'Error creating user', 400);
        // TODO: Se algum atributo não for válido retorna o erro no catch
        yield user_validator_1.ValidateUser.validate(user);
        user.password = yield user.encryptPassword(user.password ? user.password : '');
        yield user.save();
        user.password = undefined;
        response_1.responseSuccess(res, user, 200);
    }
    catch (error) {
        response_1.responseError(res, error, 400);
    }
});
exports.getByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.userId);
        if (!user)
            response_1.responseError(res, 'User not found', 404);
        user ? user.password = undefined : '';
        response_1.responseSuccess(res, user, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getUsersByType = pagination_controller_1.PaginationDataType(user_model_1.default);
exports.getUsers = pagination_controller_1.PaginationData(user_model_1.default);
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield user_model_1.default.findById(req.params.userId);
        if (!userId)
            response_1.responseError(res, 'User not found', 404);
        const user = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cpf: req.body.cpf,
            date_of_birth: req.body.date_of_birth,
            type: req.body.type,
            phone: req.body.phone,
            genre: req.body.genre,
            encryptPassword: (password) => __awaiter(void 0, void 0, void 0, function* () {
                password = req.body.password;
                const salt = yield bcrypt_1.default.genSalt(10);
                return bcrypt_1.default.hash(password, salt);
            })
        };
        user.password = yield user.encryptPassword(user.password ? user.password : '');
        // TODO: If not valid it falls in catch
        yield user_validator_1.ValidateUser.validate(user);
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
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findByIdAndRemove(req.params.userId);
        if (!user)
            response_1.responseError(res, 'User not found', 404);
        response_1.responseSuccess(res, 'User successfully removed', 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=user.controller.js.map