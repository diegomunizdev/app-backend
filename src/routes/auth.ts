import { Router } from 'express';
const router: Router = Router();
import { TokenValidation } from '../libs/verifyToken';
import { register, signin, profile } from '../controllers/auth.controller';

router.post('/signin', signin);

router.post('/register', TokenValidation, register);
router.get('/profile', TokenValidation, profile);

export default router;