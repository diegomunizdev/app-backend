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
exports.deleteEvaluation = exports.updateEvaluation = exports.getEvaluationById = exports.getEvaluation = exports.createEvaluation = void 0;
const evaluation_model_1 = __importDefault(require("../../models/evaluation.model"));
const response_1 = require("../../middlewares/response");
const evaluation_validator_1 = require("../../models/validators/evaluation.validator");
const pagination_controller_1 = require("../pagination/pagination.controller");
exports.createEvaluation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluation = new evaluation_model_1.default(req.body);
        if (!evaluation)
            return response_1.responseError(res, 'Unable to save evaluation', 400);
        evaluation_validator_1.ValidateEvaluation.validate(evaluation);
        yield evaluation.save();
        response_1.responseSuccess(res, evaluation, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getEvaluation = pagination_controller_1.PaginationData(evaluation_model_1.default);
exports.getEvaluationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluation = yield evaluation_model_1.default.findOne({ id: req.params.evaluationId });
        if (!evaluation)
            return response_1.responseError(res, 'Evaluation not found', 400);
        response_1.responseSuccess(res, evaluation, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.updateEvaluation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluationId = evaluation_model_1.default.findById({ id: req.params.evaluationId });
        if (!evaluationId)
            return response_1.responseError(res, 'Evaluation not found', 400);
        const evaluation = {
            note: req.body.note,
            title: req.body.title,
            description: req.body.description
        };
        // TODO: FIXME:
        evaluation_validator_1.ValidateEvaluation.validate(evaluation);
        yield evaluation_model_1.default.findByIdAndUpdate(evaluationId, {
            $set: evaluation
        }, { new: true });
        response_1.responseSuccess(res, evaluation, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.deleteEvaluation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluationId = yield evaluation_model_1.default.findById({ id: req.params.evaluationId });
        if (!evaluationId)
            return response_1.responseError(res, 'Evaluation not found', 400);
        const deleteEvaluation = yield evaluation_model_1.default.findByIdAndRemove(evaluationId);
        if (!deleteEvaluation)
            return response_1.responseError(res, 'Has not been removed', 400);
        response_1.responseSuccess(res, 'Evaluation successfully removed', 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=evaluation.controller.js.map