import { Router } from 'express';
import { signin, forgot, changePassword } from '../controllers/auth.controller';

export const AuthRoutes = (routes: Router) => {
    /**
     * Authentication operations
     */
    routes.post('/login', signin)
    routes.post('/forgot', forgot)
        .patch('/user/:userId/changepassword', changePassword)
}