import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserType } from 'models/user.data/user.model';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
    type: UserType;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('access_token');
        if (!token) return res.status(401).json({ error: 'Access danied' })

        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload

        req.userId = payload._id

        next()
    } catch (error) {
        res.json('ERROR:' + error)
    }
}