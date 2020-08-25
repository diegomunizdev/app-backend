import { Request, Response } from 'express';
import User from '../models/user.data/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { responseError, responseSuccess } from '../middlewares/response'

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        }).select('+password');

        if (!user) responseError(res, 'Invalid username or password', 400)

        const correctPassword: boolean = await (user ? user.validatePassword(req.body.password) : false)
        if (!correctPassword) responseError(res, 'Invalid password', 400)

        const token: string = jwt.sign({ id: user ? user._id : '', type: user ? user.type : '' }, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: '7d'
        })

        if (!token) responseSuccess(res, 'Token was not provider', 400)

        user ? user.password = undefined : ''
        // TODO: conferir se é necessário retornar o .json({ status: 200, Authorization: token })
        res.header('Authorization', token).json({ status: 200, Authorization: token })
    } catch (error) {
        responseError(res, error)
    }
}

export const forgot = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) responseError(res, 'User not found in the database', 404)
        responseSuccess(res, user, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const userId = await User.findById(req.params.userId)
        if (!userId) responseError(res, 'User not found', 404)
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
        responseSuccess(res, user, 200)
    } catch (error) {
        responseError(res, error)
    }
}