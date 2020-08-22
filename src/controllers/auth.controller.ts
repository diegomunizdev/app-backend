import { Request, Response } from 'express';
import User from '../models/user.data/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            username: req.body.username
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
        res.header('Authorization', token).json({ Authorization: token })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const forgot = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({
            status: 'Failure',
            error: 'User not found in the database'
        })
        res.status(200).json({ status: 'Success', data: user })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const userId = await User.findById(req.params.userId)
        if (!userId) return res.status(404).json({
            status: 'Failure',
            error: 'Update failed. User not found'
        })
        const user = {
            email: req.body.email,
            password: req.body.password,
            encryptPassword: async (password: string): Promise<string> => {
                password = req.body.password
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt)
            }
        }
        user.password = await user.encryptPassword(user.password ? user.password : '')
        await User.findByIdAndUpdate(userId, {
            $set: user
        }, { new: true })
        user.password = undefined
        res.status(200).json({
            status: 'Success',
            data: user
        })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}