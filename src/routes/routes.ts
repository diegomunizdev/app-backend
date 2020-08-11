import { Router } from 'express';
const routes: Router = Router();
import { TokenValidation } from '../libs/verifyToken';

import { signin } from '../controllers/auth.controller';
import { createClient, getClient, getCustomers, updateClient, deleteClient } from '../controllers/client.controller'
import { createExercise, getExercise, getExercises, updateExercise, deleteExercise } from '../controllers/exercise.controller'

// auth
routes.post('/signin', signin)

// client
routes.post('/client', TokenValidation, createClient)
    .get('/client', TokenValidation, getCustomers)
    .get('/client/:clientId', TokenValidation, getClient)
    .patch('/client/:clientId', TokenValidation, updateClient)
    .delete('/client/:clientId', TokenValidation, deleteClient)

// exercises
routes.post('/client/:clientId/exercises', TokenValidation, createExercise)
    .get('/client/:clientId/exercises', TokenValidation, getExercises)
    .get('/client/:clientId/exercises/:exerciseId', TokenValidation, getExercise)
    .patch('/client/:clientId/exercises/:exerciseId', TokenValidation, updateExercise)
    .delete('/client/:clientId/exercises/:exerciseId', TokenValidation, deleteExercise)


export default routes;