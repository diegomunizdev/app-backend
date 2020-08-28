"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
exports.AuthRoutes = (routes) => {
    // auth
    routes.post('/auth/signin', auth_controller_1.signin)
        .post('/auth/forgot', auth_controller_1.forgot)
        .patch('/auth/user/:userId/changepassword', auth_controller_1.changePassword);
};
//# sourceMappingURL=auth.routes.js.map