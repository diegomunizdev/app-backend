import { Request, Response } from 'express';
import User from '../models/user.data/user.model';
import jwt from 'jsonwebtoken';

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        }).select('+password');

        if (!user) return res.status(400).json({
            status: 'Failure',
            error: 'Invalid username or password'
        })
        const correctPassword: boolean = await user.validatePassword(req.body.password);
        if (!correctPassword) return res.status(400).json({
            status: 'Failure',
            error: 'Invalid password'
        });

        const token: string = jwt.sign({ id: user._id, type: user.type }, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: '3d'
        })

        if (!token) return res.status(401).json({
            status: 'Failure',
            error: 'Token was not provider'
        })
        user ? user.password = undefined : ''
        res.header('access_token', token).json({ access_token: token })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}