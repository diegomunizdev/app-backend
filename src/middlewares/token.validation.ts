import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserType } from 'models/user.data/user.model';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
    type: UserType;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({
            auth: false,
            message: 'No token provided.'
        });

        jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload

        next()
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}