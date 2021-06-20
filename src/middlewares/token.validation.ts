import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../controllers/errors/errors';
import jwt from 'jsonwebtoken';
import { UserType } from '../models/user.data/admin.model';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
    type: UserType;
}

export const SECRET_TOKEN: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'xxx';

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.header('Authorization');
        const [bearer, auth] = token ? token.split(' ') : '';
        if (!token || bearer !== 'Bearer') res.status(HttpStatusCode.FORBINDDEN).json({
            code: HttpStatusCode.FORBINDDEN,
            auth: false,
            status: 'Failure',
            message: 'No token provided or token malformatted.'
        });

        jwt.verify(auth, SECRET_TOKEN) as IPayload;
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            code: HttpStatusCode.BAD_REQUEST,
            status: 'Failure',
            error: error.message
        });
    }
}

export const TokenValidationAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        const [bearer, auth] = token ? token.split(' ') : '';

        if (!token || bearer !== "Bearer") return res.status(HttpStatusCode.FORBINDDEN).json({
            code: HttpStatusCode.FORBINDDEN,
            status: 'Failure',
            message: 'No token provided or token malformatted.'
        });

        const decode: any = jwt.decode(auth);
        if (decode.type === UserType.ADMIN) {
            jwt.verify(auth, SECRET_TOKEN) as IPayload;
        } else {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                code: HttpStatusCode.UNAUTHORIZED,
                status: 'Failure',
                message: 'Access denied. You are not allowed to access this route.'
            });
        }

        next();
    } catch (error) {
        res.json({ status: 'Failure', error: error.message });
    }
}

export const TokenValidationAdminAndPersonal = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        const [bearer, auth] = token ? token.split(' ') : '';

        if (!token || bearer !== "Bearer") return res.status(HttpStatusCode.FORBINDDEN).json({
            code: HttpStatusCode.FORBINDDEN,
            status: 'Failure',
            message: 'No token provided or token malformatted.'
        });

        const decode: any = jwt.decode(auth);
        if ((decode.type === UserType.ADMIN) || (decode.type === UserType.PERSONAL_TRAINER)) {
            jwt.verify(auth, SECRET_TOKEN) as IPayload;
        } else {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                code: HttpStatusCode.UNAUTHORIZED,
                status: 'Failure',
                message: 'Access denied. You are not allowed to access this route'
            });
        }

        next();
    } catch (error) {
        res.json({ status: 'Failure', error: error.message });
    }
}