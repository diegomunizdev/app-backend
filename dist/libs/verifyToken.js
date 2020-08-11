"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.TokenValidation = (req, res, next) => {
    try {
        const token = req.header('access-token');
        if (!token)
            return res.status(401).json('Acesso negado!');
        const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
        req.userId = payload._id;
        next();
    }
    catch (error) {
        res.json('ERROR:' + error);
    }
};
//# sourceMappingURL=verifyToken.js.map