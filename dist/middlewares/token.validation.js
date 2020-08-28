"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidationAdminAndPersonal = exports.TokenValidationAdmin = exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.data/user.model");
exports.TokenValidation = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token)
            return res.status(401).json({
                auth: false,
                status: 'Failure',
                message: 'No token provided.'
            });
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
        next();
    }
    catch (error) {
        res.json({ status: 'Failure', error: error.message });
    }
};
exports.TokenValidationAdmin = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token)
            return res.status(401).json({
                auth: false,
                status: 'Failure',
                message: 'No token provided.'
            });
        const decode = jsonwebtoken_1.default.decode(token);
        if (decode.type === user_model_1.UserType.ADMIN) {
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
        }
        else {
            return res.status(401).json({
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
        if (!token)
            return res.status(401).json({
                auth: false,
                status: 'Failure',
                message: 'No token provided.'
            });
        const decode = jsonwebtoken_1.default.decode(token);
        if (decode.type === (user_model_1.UserType.ADMIN || user_model_1.UserType.PERSONAL_TRAINER)) {
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
        }
        else {
            return res.status(401).json({
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