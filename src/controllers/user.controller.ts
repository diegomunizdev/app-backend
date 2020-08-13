import { Request, Response } from 'express';
import User, { IUser } from '../models/user.data/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: IUser = new User(req.body);
        user.password = await user.encryptPassword(user.password ? user.password : '');
        const saveUser = await user.save();
        // token
        const token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : undefined
        const token: string = jwt.sign({ _id: saveUser._id }, token_secret || 'tokentest');

        res.header('access_token', token).json(saveUser);
    } catch (error) {
        res.json(error)
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) return res.status(404).json({
            message: 'User not found'
        })
        user ? user.password = undefined : ''
        res.status(200).json(user)
    } catch (error) {
        res.json(error)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        if (!users) return res.status(404).json({
            message: 'Users not found'
        })
        users ? users.map(el => el.password = undefined) : ''
        res.status(200).json(users)
    } catch (error) {
        res.json(error)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(404).json({
            message: 'Update failed. User not found'
        })
        if (userId !== undefined) {
            const user = {
                name: req.body.username,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                type: req.body.type,
                phone: req.body.phone,
                encryptPassword: async (password: string): Promise<string> => {
                    password = req.body.password
                    const salt = await bcrypt.genSalt(10);
                    return bcrypt.hash(password, salt)
                }
            }
            user.password = await user.encryptPassword(user.password);
            await User.findByIdAndUpdate(userId, {
                $set: user
            }, { new: true })
            res.status(200).json()
        } else {
            res.json({
                message: 'Update failed'
            })
        }
    } catch (error) {
        res.json(error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId)
        if (!user) return res.status(404).json({
            message: 'User has not been removed'
        })
        res.status(200).json({
            status: 'User removed successfully'
        })
    } catch (error) {
        res.json(error)
    }
}

