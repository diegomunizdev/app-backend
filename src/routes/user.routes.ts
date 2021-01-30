import { Router } from 'express';
import multer from 'multer';
import { TokenValidation, TokenValidationAdmin, TokenValidationAdminAndPersonal } from '../middlewares/token.validation';
import { createAddress, getAddress, updateAddress, deleteAddress } from '../controllers/user/address.controller'
import { createExercise, getByExerciseId, updateExercise, deleteExercise } from '../controllers/user/exercise.controller'
import { createAnamnesis, getByAnamnesisId, updateAnamnesis, deleteAnamnesis } from '../controllers/user/anamnesis.controller'
import { createMeasure, getByMeasureId, updateMeasure, deleteMeasure } from '../controllers/user/measures.controller'
import { createPayment, getPayment, updatePayment, deletePayment } from '../controllers/user/payment.controller'
import { createAvatar, getAvatar } from '../controllers/user/avatar.controller';
import { createAdmin, deleteAdmin, getAll, getById, updateAdmin } from '../controllers/user/admin.controller';
import { createClient, getAllClient, getByClientId, updateClient, deleteClient } from '../controllers/user/client.controller';

const url_user = '/user/:id'

// user
export const UserRoutes = (routes: Router) => {
    /**
     * Admin operations
     */
    routes.post('/admin', createAdmin)
        .get('/admin', getAll)
        .get('/admin/:id', getById)
        .patch('/admin/:id', updateAdmin)
        .delete('/admin/:id', deleteAdmin)

    /**
     * Client operations
     */
    routes.post('/client', createClient)
        .get('/client', getAllClient)
        .get('/client/:id', getByClientId)
        .patch('/client/:id', updateClient)
        .delete('/client/:id', deleteClient)

    /**
     * Avatar operations
     */
    routes.post(`${url_user}/avatar`, TokenValidation, multer().single('avatar'), createAvatar)
        .get(`${url_user}/avatar`, TokenValidation, getAvatar)

    /**
     * Address operations
     */
    routes.post(`${url_user}/address`, TokenValidation, createAddress)
        .get(`${url_user}/address`, TokenValidation, getAddress)
        .patch(`${url_user}/address/:addressId`, TokenValidation, updateAddress)
        .delete(`${url_user}/address/:addressId`, TokenValidation, deleteAddress)

    /**
     * Exercises operations
     */
    routes.post(`${url_user}/exercises`, TokenValidationAdminAndPersonal, createExercise)
        .get(`${url_user}/exercises/:exerciseId`, TokenValidation, getByExerciseId)
        .patch(`${url_user}/exercises/:exerciseId`, TokenValidationAdminAndPersonal, updateExercise)
        .delete(`${url_user}/exercises/:exerciseId`, TokenValidationAdminAndPersonal, deleteExercise)

    /**
     * Anamnesis operations
     */
    routes.post(`${url_user}/anamnesis`, TokenValidationAdminAndPersonal, createAnamnesis)
        .get(`${url_user}/anamnesis/:anamnesisId`, TokenValidation, getByAnamnesisId)
        .patch(`${url_user}/anamnesis/:anamnesisId`, TokenValidationAdminAndPersonal, updateAnamnesis)
        .delete(`${url_user}/anamnesis/:anamnesisId`, TokenValidationAdminAndPersonal, deleteAnamnesis)

    /**
     * Measures operations
     */
    routes.post(`${url_user}/measures`, TokenValidationAdminAndPersonal, createMeasure)
        .get(`${url_user}/measures/:measureId`, TokenValidationAdminAndPersonal, getByMeasureId)
        .patch(`${url_user}/measures/:measureId`, TokenValidation, updateMeasure)
        .delete(`${url_user}/measures/:measureId`, TokenValidation, deleteMeasure)

    /**
     * Payment operations
     */
    routes.post(`${url_user}/payment`, TokenValidation, createPayment)
        .get(`${url_user}/payment`, TokenValidation, getPayment)
        .patch(`${url_user}/payment/:paymentId`, TokenValidation, updatePayment)
        .delete(`${url_user}/payment/:paymentId`, TokenValidation, deletePayment)

}