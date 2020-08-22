import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserType } from '../models/user.data/user.model';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
    type: UserType;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')

        if (!token) return res.status(401).json({
            auth: false,
            status: 'Failure',
            message: 'No token provided.'
        })

        jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload

        next()
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const TokenValidationAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')

        if (!token) return res.status(401).json({
            auth: false,
            status: 'Failure',
            message: 'No token provided.'
        })

        const decode: any = jwt.decode(token)
        if (decode.type === UserType.ADMIN) {
            jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload
        } else {
            return res.status(401).json({
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

        if (!token) return res.status(401).json({
            auth: false,
            status: 'Failure',
            message: 'No token provided.'
        })

        const decode: any = jwt.decode(token)
        if (decode.type === (UserType.ADMIN || UserType.PERSONAL_TRAINER)) {
            jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload
        } else {
            return res.status(401).json({
                status: 'Failure',
                message: 'Access denied. You are not allowed to access this route'
            })
        }

        next()
    } catch (error) {
        res.json({ status: 'Failure', error: error.message })
    }
}