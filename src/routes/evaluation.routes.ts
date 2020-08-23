import { Router } from 'express';

import { TokenValidation, TokenValidationAdmin } from '../middlewares/token.validation';
import { createEvaluation, getEvaluation, getEvaluationById, updateEvaluation, deleteEvaluation } from '../controllers/evaluation.controller';

export const EvaluationRoutes = (routes: Router) => {
    routes.post('/gym/evaluation', TokenValidationAdmin, createEvaluation)
        .get('/gym/evaluation', TokenValidation, getEvaluation)
        .get('/gym/evaluation/:evaluationId', TokenValidation, getEvaluationById)
        .patch('/gym/evaluation/:evaluationId', TokenValidationAdmin, updateEvaluation)
        .delete('/gym/evaluation/:evaluationId', TokenValidationAdmin, deleteEvaluation)
}