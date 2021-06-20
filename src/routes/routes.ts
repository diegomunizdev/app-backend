import { Router } from 'express';
const routes: Router = Router();

import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { PromotionsRoutes } from './promotion.routes';
import { EvaluationRoutes } from './evaluation.routes';

AuthRoutes(routes);
UserRoutes(routes);
PromotionsRoutes(routes);
EvaluationRoutes(routes);

export default routes;