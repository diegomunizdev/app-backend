import { Router } from 'express';
import { signin, forgot, changePassword } from '../controllers/auth.controller';

export const AuthRoutes = (routes: Router) => {
    /**
     * Authentication operations
     */
    routes.post('/auth/signin', signin)
        .post('/auth/forgot', forgot)
        .patch('/auth/user/:userId/changepassword', changePassword)
}