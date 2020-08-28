"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const promotion_routes_1 = require("./promotion.routes");
const evaluation_routes_1 = require("./evaluation.routes");
auth_routes_1.AuthRoutes(routes);
user_routes_1.UserRoutes(routes);
promotion_routes_1.PromotionsRoutes(routes);
evaluation_routes_1.EvaluationRoutes(routes);
exports.default = routes;
//# sourceMappingURL=routes.js.map