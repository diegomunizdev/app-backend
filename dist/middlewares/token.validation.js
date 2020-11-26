"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidationAdminAndPersonal = exports.TokenValidationAdmin = exports.TokenValidation = exports.SECRET_TOKEN = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.data/user.model");
const http_status_1 = require("./http.status");
exports.SECRET_TOKEN = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'xxx';
exports.TokenValidation = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const [bearer, auth] = token ? token.split(' ') : '';
        if (!token || bearer !== "Bearer")
            return res.status(http_status_1.HttpStatus.FORBINDDEN).json({
                auth: false,
                status: 'Failure',
                message: 'No token provided or token malformatted.'
            });
        jsonwebtoken_1.default.verify(auth, exports.SECRET_TOKEN);
        next();
    }
    catch (error) {
        res.status(http_status_1.HttpStatus.BAD_REQUEST).json({ status: 'Failure', error: error.message });
    }
};
exports.TokenValidationAdmin = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const [bearer, auth] = token ? token.split(' ') : '';
        if (!token || bearer !== "Bearer")
            return res.status(http_status_1.HttpStatus.FORBINDDEN).json({
                auth: false,
                status: 'Failure',
                message: 'No token provided or token malformatted.'
            });
        const decode = jsonwebtoken_1.default.decode(auth);
        if (decode.type === user_model_1.UserType.ADMIN) {
            jsonwebtoken_1.default.verify(auth, exports.SECRET_TOKEN);
        }
        else {
            return res.status(http_status_1.HttpStatus.UNAUTHORIZED).json({
                status: 'Failure',
                message: 'Access denied. You are not allowed to access this route'
            });
        }
        next();
    }
    catch (error) {
        res.json({ status: 'Failure', error: error.message });
    }
};
exports.TokenValidationAdminAndPersonal = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const [bearer, auth] = token ? token.split(' ') : '';
        if (!token || bearer !== "Bearer")
            return res.status(http_status_1.HttpStatus.FORBINDDEN).json({
                auth: false,
                status: 'Failure',
                message: 'No token provided or token malformatted.'
            });
        const decode = jsonwebtoken_1.default.decode(auth);
        if (decode.type === (user_model_1.UserType.ADMIN || user_model_1.UserType.PERSONAL_TRAINER)) {
            jsonwebtoken_1.default.verify(auth, exports.SECRET_TOKEN);
        }
        else {
            return res.status(http_status_1.HttpStatus.UNAUTHORIZED).json({
                status: 'Failure',
                message: 'Access denied. You are not allowed to access this route'
            });
        }
        next();
    }
    catch (error) {
        res.json({ status: 'Failure', error: error.message });
    }
};
//# sourceMappingURL=token.validation.js.map