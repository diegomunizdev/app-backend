import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cpf: req.body.cpf,
        date_of_birth: req.body.date_of_birth,
        type: req.body.type,
        phone: req.body.phone
    });

    user.password = await user.encryptPassword(user.password);

    const saveUser = await user.save();
    // token
    const token: string = jwt.sign({ _id: saveUser._id }, process.env.TOKEN_SECRET || 'tokentest');

    res.header('access-token', token).json(saveUser);
}

export const signin = async (req: Request, res: Response) => {

    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).json('Email ou senha incorreto')
    const correctPassword: boolean = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Senha inválida');

    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
    })

    res.header('access-token', token).json(user);
}

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId, { password: 0 })
    if (!user) return res.status(404).json('Usuário não encontrado!');
    res.json(user);
}