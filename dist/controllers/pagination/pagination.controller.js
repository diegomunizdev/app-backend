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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDataType = exports.PaginationData = void 0;
const response_1 = require("../../middlewares/response");
const user_model_1 = require("../../models/user.data/user.model");
exports.PaginationData = (model) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const page = parseInt(String(req.query.page), 10);
        const limit = parseInt(String(req.query.limit), 10);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {
            "total": yield model.countDocuments().exec(),
            "previous": {},
            "next": {},
            "data": []
        };
        try {
            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit
                };
            }
            if (endIndex < (yield model.countDocuments().exec())) {
                result.next = {
                    page: page + 1,
                    limit: limit
                };
            }
            result.data = yield model.find()
                .limit(limit)
                .skip(startIndex)
                .exec();
            result.data.map((dt) => dt.password = undefined);
            if (!result.data)
                response_1.responseError(res, 'Users not found', 400);
            response_1.responseSuccess(res, result, 200);
        }
        catch (error) {
            response_1.responseError(res, error);
        }
    });
};
exports.PaginationDataType = (model) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let page = 0;
        let limit = 0;
        let type = '';
        if (req.params.type && req.query.page && req.query.limit) {
            page = parseInt(String(req.query.page), 10);
            limit = parseInt(String(req.query.limit), 10);
            type = req.params.type;
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {
            "total": yield model.countDocuments({ type: type }).exec(),
            "previous": {},
            "next": {},
            "data": []
        };
        try {
            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit
                };
            }
            if (endIndex < (yield model.countDocuments({ type: type }).exec())) {
                result.next = {
                    page: page + 1,
                    limit: limit
                };
            }
            if (user_model_1.UserType.ADMIN === type) {
                result.data = yield model.find({ type: user_model_1.UserType.ADMIN })
                    .limit(limit)
                    .skip(startIndex)
                    .exec();
            }
            else if (user_model_1.UserType.CLIENT === type) {
                result.data = yield model.find({ type: user_model_1.UserType.CLIENT })
                    .limit(limit)
                    .skip(startIndex)
                    .exec();
            }
            else if (user_model_1.UserType.PERSONAL_TRAINER === type) {
                result.data = yield model.find({ type: user_model_1.UserType.PERSONAL_TRAINER })
                    .limit(limit)
                    .skip(startIndex)
                    .exec();
            }
            if (!result)
                response_1.responseError(res, 'Bad request', 400);
            result.data.map((dt) => dt.password = undefined);
            response_1.responseSuccess(res, result, 200);
        }
        catch (error) {
            response_1.responseError(res, error);
        }
    });
};
//# sourceMappingURL=pagination.controller.js.map