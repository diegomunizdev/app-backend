import { Request, Response } from 'express';
import User from '../models/user.data/admin.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { SECRET_TOKEN } from '../middlewares/token.validation';
import { Error } from 'mongoose';

export const signin = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findOne({
            email: req.body.email
        }).select('+password');

        if (!user) throw new Error(err.message)

        const correctPassword: boolean = await (user ? user.validatePassword(req.body.password) : false)
        if (!correctPassword) throw new Error(err.message)

        const token: string = jwt.sign({ id: user ? user._id : '', type: user ? user.type : '' }, SECRET_TOKEN, {
            expiresIn: '1d'
        })

        if (!token) throw new Error(err.message)

        user ? user.password = undefined : ''
        return res.header('Authorization', token).json({ Authorization: token })
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const forgot = async (err: Error, req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw new Error(err.message)
        res.status(200).json(user)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const changePassword = async (err: Error, req: Request, res: Response) => {
    try {
        const userId = await User.findById(req.params.userId)
        if (!userId) throw new Error(err.message)
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
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}