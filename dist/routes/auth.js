"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const verifyToken_1 = require("../libs/verifyToken");
const auth_controller_1 = require("../controllers/auth.controller");
router.post('/signin', auth_controller_1.signin);
router.post('/register', verifyToken_1.TokenValidation, auth_controller_1.register);
router.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map