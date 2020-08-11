"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const auth_1 = __importDefault(require("./routes/auth"));
// settings
app.set('port', process.env.PORT ? process.env.PORT : '');
// middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use((req, res, next) => {
    // Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    // Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,PATCH,POST,DELETE');
    app.use(cors_1.default());
    next();
});
// routes
app.use('/api/auth', auth_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map