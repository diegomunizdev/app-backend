import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Error } from 'mongoose';

import { SECRET_TOKEN } from '../middlewares/token.validation';
import User from '../models/user.data/admin.model';
import { HttpMessage, HttpStatusCode } from './errors/errors';

export const signin = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findOne({
            email: req.body.email
        }).select('+password');
        if (!user) throw new Error(HttpMessage.BAD_REQUEST)

        const correctPassword: boolean = await (user ? user.validatePassword(req.body.password) : false)
        if (!correctPassword) throw new Error(HttpMessage.BAD_REQUEST)

        const token: string = jwt.sign({ id: user ? user._id : '', type: user ? user.type : '' }, SECRET_TOKEN, {
            expiresIn: '1d'
        })

        if (!token) throw new Error(HttpMessage.BAD_REQUEST)

        user ? user.password = undefined : ''
        return res.status(HttpStatusCode.OK).header('Authorization', token).json({ Authorization: token })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const forgot = async (req: Request, res: Response) => {
    try {
        if (!req.body.email) throw new Error(HttpMessage.BAD_REQUEST)

        const user = await User.findOne({ email: req.body.email })

        if (!user) throw new Error(HttpMessage.NOT_FOUND)

        res.status(HttpStatusCode.OK).json(user)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) throw new Error(HttpMessage.BAD_REQUEST)

        const userId = await User.findById(req.params.id)

        if (!userId) throw new Error(HttpMessage.NOT_FOUND)

        const user = {
            email: req.body.email,
            password: req.body.password,
            encryptPassword: async (password: string): Promise<string> => {
                password = req.body.password
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt)
            }
        }

        user.password = await user.encryptPassword(user.password ? user.password : null)

        const result = await User.findByIdAndUpdate(userId, {
            $set: user
        }, { new: true })

        user ? user.password = undefined : null

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}