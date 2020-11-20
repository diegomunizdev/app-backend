"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const token_validation_1 = require("../middlewares/token.validation");
const user_controller_1 = require("../controllers/user/user.controller");
const address_controller_1 = require("../controllers/user/address.controller");
const exercise_controller_1 = require("../controllers/user/exercise.controller");
const anamnesis_controller_1 = require("../controllers/user/anamnesis.controller");
const measures_controller_1 = require("../controllers/user/measures.controller");
const url_user = '/user/:userId';
// user
exports.UserRoutes = (routes) => {
    routes.post('/user', token_validation_1.TokenValidationAdmin, user_controller_1.createUser)
        .get('/user', token_validation_1.TokenValidationAdminAndPersonal, user_controller_1.getUsers)
        .get('/users/:type', token_validation_1.TokenValidationAdminAndPersonal, user_controller_1.getUsersByType)
        .get(`${url_user}`, token_validation_1.TokenValidationAdminAndPersonal, user_controller_1.getByUserId)
        .patch(`${url_user}`, token_validation_1.TokenValidation, user_controller_1.updateUser)
        .delete(`${url_user}`, token_validation_1.TokenValidationAdmin, user_controller_1.deleteUser);
    // Address
    routes.post(`${url_user}/address`, token_validation_1.TokenValidation, address_controller_1.createAddress)
        .get(`${url_user}/address`, token_validation_1.TokenValidation, address_controller_1.getAddress)
        .patch(`${url_user}/address`, token_validation_1.TokenValidation, address_controller_1.updateAddress)
        .delete(`${url_user}/address`, token_validation_1.TokenValidation, address_controller_1.deleteAddress);
    // exercises
    routes.post(`${url_user}/exercises`, token_validation_1.TokenValidationAdminAndPersonal, exercise_controller_1.createExercise)
        .get(`${url_user}/exercises`, token_validation_1.TokenValidation, exercise_controller_1.getExercises)
        .get(`${url_user}/exercises/:exerciseId`, token_validation_1.TokenValidation, exercise_controller_1.getByExerciseId)
        .patch(`${url_user}/exercises/:exerciseId`, token_validation_1.TokenValidationAdminAndPersonal, exercise_controller_1.updateExercise)
        .delete(`${url_user}/exercises/:exerciseId`, token_validation_1.TokenValidationAdminAndPersonal, exercise_controller_1.deleteExercise);
    // anamnesis
    routes.post(`${url_user}/anamnesis`, token_validation_1.TokenValidationAdminAndPersonal, anamnesis_controller_1.createAnamnesis)
        .get(`${url_user}/anamnesis`, token_validation_1.TokenValidation, anamnesis_controller_1.getAllAnamnesis)
        .get(`${url_user}/anamnesis/:anamnesisId`, token_validation_1.TokenValidation, anamnesis_controller_1.getByAnamnesisId)
        .patch(`${url_user}/anamnesis/:anamnesisId`, token_validation_1.TokenValidationAdminAndPersonal, anamnesis_controller_1.updateAnamnesis)
        .delete(`${url_user}/anamnesis/:anamnesisId`, token_validation_1.TokenValidationAdminAndPersonal, anamnesis_controller_1.deleteAnamnesis);
    // measures
    routes.post(`${url_user}/measures`, token_validation_1.TokenValidationAdminAndPersonal, measures_controller_1.createMeasure)
        .get(`${url_user}/measures`, token_validation_1.TokenValidation, measures_controller_1.getMeasures)
        .get(`${url_user}/measures/:measureId`, token_validation_1.TokenValidationAdminAndPersonal, measures_controller_1.getByMeasureId)
        .patch(`${url_user}/measures/:measureId`, token_validation_1.TokenValidation, measures_controller_1.updateMeasure)
        .delete(`${url_user}/measures/:measureId`, token_validation_1.TokenValidation, measures_controller_1.deleteMeasure);
};
//# sourceMappingURL=user.routes.js.map