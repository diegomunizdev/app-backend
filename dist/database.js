"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database = process.env.CONNECTION_DATABASE ? process.env.CONNECTION_DATABASE : '';
mongoose_1.default.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((result) => {
    result.connection;
    console.log('>>> Banco de Dados está conectado!');
}).catch(err => {
    console.log('Não foi possível estabelecer uma conexão com o Banco de Dados. Error: ', err);
});
//# sourceMappingURL=database.js.map