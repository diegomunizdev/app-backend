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
exports.deleteMeasure = exports.updateMeasure = exports.getByMeasureId = exports.getMeasures = exports.createMeasure = void 0;
const measures_model_1 = __importDefault(require("../../models/user.data/measures.model"));
const response_1 = require("../../middlewares/response");
const measures_validator_1 = require("../../models/validators/measures.validator");
const pagination_controller_1 = require("../pagination/pagination.controller");
exports.createMeasure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const measure = new measures_model_1.default(req.body);
        if (!measure)
            response_1.responseError(res, 'Measure not created', 400);
        measures_validator_1.ValidateMeasure.validate(measure);
        yield measure.save();
        response_1.responseSuccess(res, measure, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getMeasures = pagination_controller_1.PaginationData(measures_model_1.default);
exports.getByMeasureId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const measure = yield measures_model_1.default.findById(req.params.measureId);
        if (!measure)
            response_1.responseError(res, 'Measure not found', 404);
        response_1.responseSuccess(res, measure, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.updateMeasure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { measureId } = req.params;
        if (!measureId)
            response_1.responseError(res, 'Measure not found', 404);
        const measure = {
            weight: req.body.weight,
            height: req.body.height,
            chest: req.body.chest,
            waist: req.body.waist,
            upper_abdomen: req.body.upper_abdomen,
            lower_abdormen: req.body.lower_abdormen,
            hip: req.body.hip,
            right_arm: req.body.right_arm,
            left_arm: req.body.left_arm,
            before_right_arm: req.body.before_right_arm,
            before_left_arm: req.body.before_left_arm,
            upper_right_thigh: req.body.upper_right_thigh,
            upper_left_thigh: req.body.upper_left_thigh,
            medium_right_thigh: req.body.medium_right_thigh,
            middle_left_thigh: req.body.middle_left_thigh,
            right_calf: req.body.right_calf,
            left_calf: req.body.left_calf
        };
        yield measures_model_1.default.findByIdAndUpdate(measureId, {
            $set: measure
        }, { new: true });
        response_1.responseSuccess(res, measure, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.deleteMeasure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const measureId = req.params.measureId;
        if (!measureId)
            response_1.responseError(res, 'Measure not found', 404);
        yield measures_model_1.default.findByIdAndRemove(measureId);
        response_1.responseSuccess(res, 'Measure successfully removed', 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=measures.controller.js.map