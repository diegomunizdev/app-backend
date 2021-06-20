import { Router } from 'express';

import { TokenValidation, TokenValidationAdmin } from '../middlewares/token.validation';
import { createEvaluation, getEvaluationById, updateEvaluation, deleteEvaluation } from '../controllers/evaluation.controller';

export const EvaluationRoutes = (routes: Router) => {
    /**
     * Evaluation operations
     */
    routes.post('/evaluation', TokenValidationAdmin, createEvaluation)
        .get('/evaluation/:evaluationId', TokenValidation, getEvaluationById)
        .patch('/evaluation/:evaluationId', TokenValidationAdmin, updateEvaluation)
        .delete('/evaluation/:evaluationId', TokenValidationAdmin, deleteEvaluation);
}