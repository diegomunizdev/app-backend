"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSuccess = exports.responseError = void 0;
exports.responseError = (res, err, status_code) => {
    return res.status(status_code ? status_code : 400).json({
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