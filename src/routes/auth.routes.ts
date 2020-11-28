import { Router } from 'express';
import { signin, forgot, changePassword } from '../controllers/auth.controller';

export const AuthRoutes = (routes: Router) => {
    // auth
    routes.post('/auth/signin', signin)
        .get('/auth/forgot', forgot)
        .patch('/auth/user/:userId/changepassword', changePassword)
}