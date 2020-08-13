import { Router } from 'express';
const routes: Router = Router();
import { TokenValidation } from '../middlewares/verifyToken';

import { signin } from '../controllers/auth.controller';
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller'
import { createExercise, getExercise, getExercises, updateExercise, deleteExercise } from '../controllers/exercise.controller'
import { createAnamnesis, getAllAnamnesis, getAnamnesis, updateAnamnesis, deleteAnamnesis } from '../controllers/anamnesis.controller'
import { createMeasure, getMeasure, getMeasures, updateMeasure, deleteMeasure } from '../controllers/measures.controller'
import { createPromotion, getPromotion, getPromotions, updatePromotion, deletePromotion } from '../controllers/promotion.controller';
// auth
routes.post('/auth/signin', signin)

// user
routes.post('/user', TokenValidation, createUser)
    .get('/user', TokenValidation, getUsers)
    .get('/user/:userId', TokenValidation, getUser)
    .patch('/user/:userId', TokenValidation, updateUser)
    .delete('/user/:userId', TokenValidation, deleteUser)

// exercises
routes.post('/user/:userId/exercises', TokenValidation, createExercise)
    .get('/user/:userId/exercises', TokenValidation, getExercises)
    .get('/user/:userId/exercises/:exerciseId', TokenValidation, getExercise)
    .patch('/user/:userId/exercises/:exerciseId', TokenValidation, updateExercise)
    .delete('/user/:userId/exercises/:exerciseId', TokenValidation, deleteExercise)

// anamnesis
routes.post('/user/:userId/anamnesis', TokenValidation, createAnamnesis)
    .get('/user/:userId/anamnesis', TokenValidation, getAllAnamnesis)
    .get('/user/:userId/anamnesis/:anamnesisId', TokenValidation, getAnamnesis)
    .patch('/user/:userId/anamnesis/:anamnesisId', TokenValidation, updateAnamnesis)
    .delete('/user/:userId/anamnesis/:anamnesisId', TokenValidation, deleteAnamnesis)

// measures
routes.post('/user/:userId/measures', TokenValidation, createMeasure)
    .get('/user/:userId/measures', TokenValidation, getMeasures)
    .get('/user/:userId/measures/:measureId', TokenValidation, getMeasure)
    .patch('/user/:userId/measures/:measureId', TokenValidation, updateMeasure)
    .delete('/user/:userId/measures/:measureId', TokenValidation, deleteMeasure)

// promotion
routes.post('/user/:userId/promotion', TokenValidation, createPromotion)
    .get('/user/:userId/promotion', TokenValidation, getPromotions)
    .get('/user/:userId/promotion/:promotionId', TokenValidation, getPromotion)
    .patch('/user/:userId/promotion/:promotionId', TokenValidation, updatePromotion)
    .delete('/user/:userId/promotion/:promotionId', TokenValidation, deletePromotion)

export default routes;