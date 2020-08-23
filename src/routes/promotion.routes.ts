import { Router } from 'express';

import { TokenValidationAdmin } from '../middlewares/token.validation';
import { createPromotion, getByPromotionId, getPromotions, updatePromotion, deletePromotion } from '../controllers/promotion.controller';

const url_user = '/user/:userId'

export const PromotionsRoutes = (routes: Router) => {
    routes.post(`${url_user}/promotion`, TokenValidationAdmin, createPromotion)
        .get(`${url_user}/promotion`, TokenValidationAdmin, getPromotions)
        .get(`${url_user}/promotion/:promotionId`, TokenValidationAdmin, getByPromotionId)
        .patch(`${url_user}/promotion/:promotionId`, TokenValidationAdmin, updatePromotion)
        .delete(`${url_user}/promotion/:promotionId`, TokenValidationAdmin, deletePromotion)
}