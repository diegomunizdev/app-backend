import { Request, Response } from 'express';
import User from '../models/user.data/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { responseError, responseSuccess } from '../middlewares/response'
import { HttpStatus } from '../middlewares/http.status';
import { SECRET_TOKEN } from '../middlewares/token.validation';

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        }).select('+password');

        if (!user) responseError(res, 'Invalid username or password', HttpStatus.BAD_REQUEST)

        const correctPassword: boolean = await (user ? user.validatePassword(req.body.password) : false)
        if (!correctPassword) responseError(res, 'Invalid password', HttpStatus.BAD_REQUEST)

        const token: string = jwt.sign({ id: user ? user._id : '', type: user ? user.type : '' }, SECRET_TOKEN, {
            expiresIn: '1d'
        })

        if (!token) responseSuccess(res, 'Token was not provider', HttpStatus.BAD_REQUEST)

        user ? user.password = undefined : ''
        res.header('Authorization', token).json({ status: HttpStatus.OK, Authorization: token })
    } catch (error) {
        responseError(res, error)
    }
}

export const forgot = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) responseError(res, 'User not found in the database', HttpStatus.NOT_FOUND)
        responseSuccess(res, user, HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const userId = await User.findById(req.params.userId)
        if (!userId) responseError(res, 'User not found', HttpStatus.NOT_FOUND)
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
        responseSuccess(res, user, HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}