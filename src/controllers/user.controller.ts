import { Request, Response } from 'express'
import User, { IUser } from '../models/user.data/user.model'
import bcrypt from 'bcrypt'
import { responseError, responseSuccess } from '../middlewares/response'
import { ValidateUser } from '../models/validators/user.validator';
import { PaginationData, PaginationDataType } from './pagination/pagination.controller';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: IUser = new User(req.body);
        if (!user) responseError(res, 'Error creating user', 400)
        // TODO: Se algum atributo não for válido retorna o erro no catch
        await ValidateUser.validate(user)
        user.password = await user.encryptPassword(user.password ? user.password : '');
        await user.save()
        user.password = undefined
        responseSuccess(res, user, 200)
    } catch (error) {
        responseError(res, error, 400)
    }
}

export const getByUserId = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) responseError(res, 'User not found', 404)
        user ? user.password = undefined : ''
        responseSuccess(res, user, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const getUsersByType = PaginationDataType(User)

export const getUsers = PaginationData(User)

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = await User.findById(req.params.userId)
        if (!userId) responseError(res, 'User not found', 404)
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
        // TODO: If not valid it falls in catch
        await ValidateUser.validate(user)
        await User.findByIdAndUpdate(userId, {
            $set: user
        }, { new: true })
        user.password = undefined
        responseSuccess(res, user, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId)
        if (!user) responseError(res, 'User not found', 404)
        responseSuccess(res, 'User successfully removed', 200)
    } catch (error) {
        responseError(res, error)
    }
}

