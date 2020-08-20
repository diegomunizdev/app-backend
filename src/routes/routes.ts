import { Router } from 'express';
const routes: Router = Router();
import { TokenValidation } from '../middlewares/token.validation';

import { signin } from '../controllers/auth.controller';
import { createUser, getByUserId, getUsers, updateUser, deleteUser } from '../controllers/user.controller'
import { createAddress, getAddress, updateAddress, deleteAddress } from '../controllers/address.controller'
import { createExercise, getByExerciseId, getExercises, updateExercise, deleteExercise } from '../controllers/exercise.controller'
import { createAnamnesis, getAllAnamnesis, getByAnamnesisId, updateAnamnesis, deleteAnamnesis } from '../controllers/anamnesis.controller'
import { createMeasure, getByMeasureId, getMeasures, updateMeasure, deleteMeasure } from '../controllers/measures.controller'
import { createPromotion, getByPromotionId, getPromotions, updatePromotion, deletePromotion } from '../controllers/promotion.controller';

// auth
routes.post('/auth/signin', signin)

const url_user = '/user/:userId'

// user
routes.post('/user', TokenValidation, createUser)
    .get('/user', TokenValidation, getUsers)
    .get(`${url_user}`, TokenValidation, getByUserId)
    .patch(`${url_user}`, TokenValidation, updateUser)
    .delete(`${url_user}`, TokenValidation, deleteUser)

// Address
routes.post(`${url_user}/address`, TokenValidation, createAddress)
    .get(`${url_user}/address`, TokenValidation, getAddress)
    .patch(`${url_user}/address`, TokenValidation, updateAddress)
    .delete(`${url_user}/address`, TokenValidation, deleteAddress)

// exercises
routes.post(`${url_user}/exercises`, TokenValidation, createExercise)
    .get(`${url_user}/exercises`, TokenValidation, getExercises)
    .get(`${url_user}/exercises/:exerciseId`, TokenValidation, getByExerciseId)
    .patch(`${url_user}/exercises/:exerciseId`, TokenValidation, updateExercise)
    .delete(`${url_user}/exercises/:exerciseId`, TokenValidation, deleteExercise)

// anamnesis
routes.post(`${url_user}/anamnesis`, TokenValidation, createAnamnesis)
    .get(`${url_user}/anamnesis`, TokenValidation, getAllAnamnesis)
    .get(`${url_user}/anamnesis/:anamnesisId`, TokenValidation, getByAnamnesisId)
    .patch(`${url_user}/anamnesis/:anamnesisId`, TokenValidation, updateAnamnesis)
    .delete(`${url_user}/anamnesis/:anamnesisId`, TokenValidation, deleteAnamnesis)

// measures
routes.post(`${url_user}/measures`, TokenValidation, createMeasure)
    .get(`${url_user}/measures`, TokenValidation, getMeasures)
    .get(`${url_user}/measures/:measureId`, TokenValidation, getByMeasureId)
    .patch(`${url_user}/measures/:measureId`, TokenValidation, updateMeasure)
    .delete(`${url_user}/measures/:measureId`, TokenValidation, deleteMeasure)

// promotion
routes.post(`${url_user}/promotion`, TokenValidation, createPromotion)
    .get(`${url_user}/promotion`, TokenValidation, getPromotions)
    .get(`${url_user}/promotion/:promotionId`, TokenValidation, getByPromotionId)
    .patch(`${url_user}/promotion/:promotionId`, TokenValidation, updatePromotion)
    .delete(`${url_user}/promotion/:promotionId`, TokenValidation, deletePromotion)

export default routes;