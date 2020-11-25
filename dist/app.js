"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const http_status_1 = require("./middlewares/http.status");
const app = express_1.default();
// middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PATCH,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors_1.default());
    next();
});
// routes
app.use('/gym', routes_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.HttpStatus.NOT_FOUND).json({
        code: http_status_1.HttpStatus.NOT_FOUND,
        message: 'Página não encontrada!'
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map