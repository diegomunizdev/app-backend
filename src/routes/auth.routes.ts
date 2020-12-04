import { Router } from 'express';
import { signin, forgot, changePassword } from '../controllers/auth.controller';

export const AuthRoutes = (routes: Router) => {
    /**
     * Authentication operations
     */
    routes.post('/user/authentication/signin', signin)
        .post('/user/authentication/forgot', forgot)
        .patch('/user/:userId/authentication/changepassword', changePassword)
}