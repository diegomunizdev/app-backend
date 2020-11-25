import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserType } from '../models/user.data/user.model';
import { HttpStatus } from './http.status';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
    type: UserType;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        const [bearer, auth] = token ? token.split(' ') : ''

        if (!token || bearer !== "Bearer") return res.status(HttpStatus.FORBINDDEN).json({
            auth: false,
            status: 'Failure',
            message: 'No token provided or token malformatted.'
        })

        jwt.verify(auth, process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'xxx') as IPayload

        next()
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ status: 'Failure', error: error.message })
    }
}

export const TokenValidationAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')

        if (!token) return res.status(HttpStatus.FORBINDDEN).json({
            auth: false,
            status: 'Failure',
            message: 'No token provided.'
        })

        const decode: any = jwt.decode(token)
        if (decode.type === UserType.ADMIN) {
            jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                status: 'Failure',
                message: 'Access denied. You are not allowed to access this route'
            })
        }

        next()
    } catch (error) {
        res.json({ status: 'Failure', error: error.message })
    }
}

export const TokenValidationAdminAndPersonal = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')

        if (!token) return res.status(HttpStatus.FORBINDDEN).json({
            auth: false,
            status: 'Failure',
            message: 'No token provided.'
        })

        const decode: any = jwt.decode(token)
        if (decode.type === (UserType.ADMIN || UserType.PERSONAL_TRAINER)) {
            jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                status: 'Failure',
                message: 'Access denied. You are not allowed to access this route'
            })
        }

        next()
    } catch (error) {
        res.json({ status: 'Failure', error: error.message })
    }
}