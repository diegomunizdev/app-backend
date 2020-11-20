"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSuccess = exports.responseError = void 0;
const http_status_1 = require("./http.status");
exports.responseError = (res, err, status_code) => {
    return res.status(status_code ? status_code : http_status_1.HttpStatus.BAD_REQUEST).json({
        code: status_code,
        status: 'Failure',
        message: err.message,
        field: err.path
    });
};
exports.responseSuccess = (res, data, status_code) => {
    return res.status(status_code).json({
        code: status_code,
        status: 'success',
        data: data
    });
};
//# sourceMappingURL=response.js.map