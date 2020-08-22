import { Request, Response } from 'express'
import User, { IUser } from '../models/user.data/user.model'
import bcrypt from 'bcrypt'
import { PaginationData, PaginationDataType } from './pagination.controller';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: IUser = new User(req.body);
        if (!user) return res.status(400).json({
            status: 'Failure',
            error: 'Error creating user'
        })
        user.password = await user.encryptPassword(user.password ? user.password : '');
        await user.save()
        res.status(200).json({ status: 'Success', data: user })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const getByUserId = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) return res.status(404).json({
            status: 'Failure',
            message: 'User not found'
        })
        user ? user.password = undefined : ''
        res.status(200).json({ status: 'Success', data: user })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const getUsersByType = PaginationDataType(User)

export const getUsers = PaginationData(User)

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = await User.findById(req.params.userId)
        if (!userId) return res.status(404).json({
            status: 'Failure',
            error: 'Update failed. User not found'
        })
        const user = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cpf: req.body.cpf,
            date_of_birth: req.body.date_of_birth,
            type: req.body.type,
            phone: req.body.phone,
            genre: req.body.genre,
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

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId)
        if (!user) return res.status(404).json({
            status: 'Failure',
            error: 'User has not been removed'
        })
        res.status(200).json({
            status: 'Success',
            message: 'User removed successfully'
        })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

