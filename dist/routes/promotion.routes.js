"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsRoutes = void 0;
const token_validation_1 = require("../middlewares/token.validation");
const promotion_controller_1 = require("../controllers/promotion.controller");
const url_user = '/user/:userId';
exports.PromotionsRoutes = (routes) => {
    routes.post(`${url_user}/promotion`, token_validation_1.TokenValidationAdmin, promotion_controller_1.createPromotion)
        .get(`${url_user}/promotion`, token_validation_1.TokenValidationAdmin, promotion_controller_1.getPromotions)
        .get(`${url_user}/promotion/:promotionId`, token_validation_1.TokenValidationAdmin, promotion_controller_1.getByPromotionId)
        .patch(`${url_user}/promotion/:promotionId`, token_validation_1.TokenValidationAdmin, promotion_controller_1.updatePromotion)
        .delete(`${url_user}/promotion/:promotionId`, token_validation_1.TokenValidationAdmin, promotion_controller_1.deletePromotion);
};
//# sourceMappingURL=promotion.routes.js.map