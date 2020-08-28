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
exports.deleteExercise = exports.updateExercise = exports.getByExerciseId = exports.getExercises = exports.createExercise = void 0;
const exercise_model_1 = __importDefault(require("../models/user.data/exercise.model"));
const pagination_controller_1 = require("./pagination.controller");
const response_1 = require("../middlewares/response");
const exercise_validator_1 = require("../validators/exercise.validator");
exports.createExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = new exercise_model_1.default(req.body);
        if (!exercise)
            response_1.responseError(res, 'Exercise not created', 404);
        exercise_validator_1.ValidateExercise.validate(exercise);
        yield exercise.save();
        response_1.responseSuccess(res, exercise, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getExercises = pagination_controller_1.PaginationData(exercise_model_1.default);
exports.getByExerciseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = yield exercise_model_1.default.findById(req.params.exerciseId);
        if (!exercise)
            response_1.responseError(res, 'Exercise not found', 404);
        response_1.responseSuccess(res, exercise, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.updateExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exerciseId } = req.params;
        if (!exerciseId)
            response_1.responseError(res, 'Exercise not found', 404);
        const exercise = {
            exercise_monday: req.body.exercise_monday,
            exercise_tuesday: req.body.exercise_tuesday,
            exercise_wednesday: req.body.exercise_wednesday,
            exercise_thursday: req.body.exercise_thursday,
            exercise_friday: req.body.exercise_friday,
            exercise_saturday: req.body.exercise_saturday,
            exercise_sunday: req.body.exercise_sunday
        };
        yield exercise_model_1.default.findByIdAndUpdate(exerciseId, {
            $set: exercise
        }, { new: true });
        response_1.responseSuccess(res, exercise, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.deleteExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exerciseId = req.params.exerciseId;
        if (!exerciseId)
            response_1.responseError(res, 'Exercise not found', 404);
        yield exercise_model_1.default.findByIdAndRemove(exerciseId);
        response_1.responseSuccess(res, 'Exercise successfully removed', 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=exercise.controller.js.map