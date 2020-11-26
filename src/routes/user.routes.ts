import { Router } from 'express';

import { TokenValidation, TokenValidationAdmin, TokenValidationAdminAndPersonal } from '../middlewares/token.validation';
import { createUser, getByUserId, getUsers, getUsersByType, updateUser, deleteUser } from '../controllers/user/user.controller'
import { createAddress, getAddress, updateAddress, deleteAddress } from '../controllers/user/address.controller'
import { createExercise, getByExerciseId, getExercises, updateExercise, deleteExercise } from '../controllers/user/exercise.controller'
import { createAnamnesis, getAllAnamnesis, getByAnamnesisId, updateAnamnesis, deleteAnamnesis } from '../controllers/user/anamnesis.controller'
import { createMeasure, getByMeasureId, getMeasures, updateMeasure, deleteMeasure } from '../controllers/user/measures.controller'
import { createPayment, getPayment, updatePayment, deletePayment } from '../controllers/user/payment.controller'

const url_user = '/user/:userId'

// user
export const UserRoutes = (routes: Router) => {
    // User
    routes.post('/user', TokenValidationAdmin, createUser)
        .get('/user', TokenValidation, getUsers)
        .get('/users/:type', TokenValidationAdminAndPersonal, getUsersByType)
        .get(`${url_user}`, TokenValidationAdminAndPersonal, getByUserId)
        .patch(`${url_user}`, TokenValidation, updateUser)
        .delete(`${url_user}`, TokenValidationAdmin, deleteUser)

    // Address
    routes.post(`${url_user}/address`, TokenValidation, createAddress)
        .get(`${url_user}/address`, TokenValidation, getAddress)
        .patch(`${url_user}/address`, TokenValidation, updateAddress)
        .delete(`${url_user}/address`, TokenValidation, deleteAddress)

    // exercises
    routes.post(`${url_user}/exercises`, TokenValidationAdminAndPersonal, createExercise)
        .get(`${url_user}/exercises`, TokenValidation, getExercises)
        .get(`${url_user}/exercises/:exerciseId`, TokenValidation, getByExerciseId)
        .patch(`${url_user}/exercises/:exerciseId`, TokenValidationAdminAndPersonal, updateExercise)
        .delete(`${url_user}/exercises/:exerciseId`, TokenValidationAdminAndPersonal, deleteExercise)

    // anamnesis
    routes.post(`${url_user}/anamnesis`, TokenValidationAdminAndPersonal, createAnamnesis)
        .get(`${url_user}/anamnesis`, TokenValidation, getAllAnamnesis)
        .get(`${url_user}/anamnesis/:anamnesisId`, TokenValidation, getByAnamnesisId)
        .patch(`${url_user}/anamnesis/:anamnesisId`, TokenValidationAdminAndPersonal, updateAnamnesis)
        .delete(`${url_user}/anamnesis/:anamnesisId`, TokenValidationAdminAndPersonal, deleteAnamnesis)

    // measures
    routes.post(`${url_user}/measures`, TokenValidationAdminAndPersonal, createMeasure)
        .get(`${url_user}/measures`, TokenValidation, getMeasures)
        .get(`${url_user}/measures/:measureId`, TokenValidationAdminAndPersonal, getByMeasureId)
        .patch(`${url_user}/measures/:measureId`, TokenValidation, updateMeasure)
        .delete(`${url_user}/measures/:measureId`, TokenValidation, deleteMeasure)

    // Payment
    routes.post(`${url_user}/payment`, TokenValidation, createPayment)
        .get(`${url_user}/payment`, TokenValidation, getPayment)
        .patch(`${url_user}/payment/:paymentId`, TokenValidation, updatePayment)
        .delete(`${url_user}/payment/:paymentId`, TokenValidation, deletePayment)

}