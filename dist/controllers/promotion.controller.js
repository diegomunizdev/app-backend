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
exports.deletePromotion = exports.updatePromotion = exports.getPromotions = exports.getByPromotionId = exports.createPromotion = void 0;
const promotions_model_1 = __importDefault(require("../models/promotions.model"));
const response_1 = require("../middlewares/response");
const promotion_validator_1 = require("../models/validators/promotion.validator");
const pagination_controller_1 = require("./pagination/pagination.controller");
const http_status_1 = require("../middlewares/http.status");
exports.createPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotion = new promotions_model_1.default(req.body);
        if (!promotion)
            response_1.responseError(res, 'Promotion could not be created', 400);
        promotion_validator_1.ValidatePromotion.validate(promotion);
        yield promotion.save();
        response_1.responseSuccess(res, promotion, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getByPromotionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotion = yield promotions_model_1.default.findById(req.params.promotionId);
        if (!promotion)
            response_1.responseError(res, 'Promotion not found', 404);
        response_1.responseSuccess(res, promotion, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getPromotions = pagination_controller_1.PaginationData(promotions_model_1.default);
exports.updatePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { promotionId } = req.params;
        if (!promotionId)
            response_1.responseError(res, 'Promotion not found', http_status_1.HttpStatus.NOT_FOUND);
        const promotion = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            value: req.body.value,
            date_start: req.body.date_start,
            date_end: req.body.date_end,
            user_id: req.body.user_id
        };
        yield promotions_model_1.default.findByIdAndUpdate(promotionId, {
            $set: promotion
        }, { new: true });
        response_1.responseSuccess(res, promotion, http_status_1.HttpStatus.OK);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.deletePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotionId = req.params.promotionId;
        if (!promotionId)
            response_1.responseError(res, 'Promotion not found', http_status_1.HttpStatus.NOT_FOUND);
        yield promotions_model_1.default.findByIdAndRemove(promotionId);
        response_1.responseSuccess(res, 'Promotion successfully removed', http_status_1.HttpStatus.OK);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=promotion.controller.js.map