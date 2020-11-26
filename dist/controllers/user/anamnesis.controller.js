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
exports.deleteAnamnesis = exports.updateAnamnesis = exports.getByAnamnesisId = exports.getAllAnamnesis = exports.createAnamnesis = void 0;
const response_1 = require("../../middlewares/response");
const anamnesis_model_1 = __importDefault(require("../../models/user.data/anamnesis.model"));
const anamnesis_validator_1 = require("../../models/validators/anamnesis.validator");
const pagination_controller_1 = require("../pagination/pagination.controller");
exports.createAnamnesis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const anamnesis = new anamnesis_model_1.default(req.body);
        if (!anamnesis)
            response_1.responseError(res, 'Listing could not be created', 400);
        anamnesis_validator_1.ValidateAnamnesis.validate(anamnesis);
        yield anamnesis.save();
        response_1.responseSuccess(res, anamnesis, 201);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getAllAnamnesis = pagination_controller_1.PaginationData(anamnesis_model_1.default);
exports.getByAnamnesisId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const anamnesis = yield anamnesis_model_1.default.findById(req.params.anamnesisId);
        if (!anamnesis)
            response_1.responseError(res, 'Bad request', 400);
        response_1.responseSuccess(res, anamnesis, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.updateAnamnesis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { anamnesisId } = req.params;
        if (!anamnesisId)
            response_1.responseError(res, 'Bad request', 400);
        const anamnesis = {
            activity_objective: req.body.activity_objective,
            health_problems: req.body.health_problems,
            medical_treatment: req.body.medical_treatment,
            medication_use: req.body.medication_use,
            diabetes: req.body.diabetes,
            arterial_hypertension: req.body.arterial_hypertension,
            arterial_hypotension: req.body.arterial_hypotension,
            smoking: req.body.smoking,
            allergy: req.body.allergy,
            pacemaker: req.body.pacemaker,
            sitting_time: req.body.sitting_time,
            standing_time: req.body.standing_time,
            prosthesis: req.body.prosthesis,
            orthosis: req.body.orthosis,
            water_day: req.body.water_day,
            intestinal_disorder: req.body.intestinal_disorder,
            hormonal_disorder: req.body.hormonal_disorder,
            next_review: req.body.next_review
        };
        yield anamnesis_model_1.default.findByIdAndUpdate(anamnesisId, {
            $set: anamnesis
        }, { new: true });
        response_1.responseSuccess(res, anamnesis, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.deleteAnamnesis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const anamnesisId = req.params.anamnesisId;
        if (!anamnesisId)
            response_1.responseError(res, 'Bad request', 400);
        yield anamnesis_model_1.default.findByIdAndRemove(anamnesisId);
        response_1.responseSuccess(res, 'Anamneses successfully removed', 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=anamnesis.controller.js.map