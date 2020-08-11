import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user) return res.status(400).json('Email ou senha incorreto')
        const correctPassword: boolean = await user.validatePassword(req.body.password);
        if (!correctPassword) return res.status(400).json('Senha inválida');

        const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24
        })

        res.header('access-token', [token, user.type]).json(user);
    } catch (error) {
        res.json(error)
    }
}