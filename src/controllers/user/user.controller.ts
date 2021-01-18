import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User, { IUser } from '../../models/user.data/user.model'
import { responseError, responseSuccess } from '../../middlewares/response'
import { ValidateUser } from '../../models/validators/user.validator';
import { PaginationData, PaginationDataType } from '../pagination/pagination.controller';
import { HttpStatus } from '../../middlewares/http.status';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user: IUser = new User(req.body);
        if (!user) responseError(res, 'Error creating user', HttpStatus.BAD_REQUEST)
        // TODO: Se algum atributo não for válido retorna o erro no catch
        await ValidateUser.validate(user)
        user.password = await user.encryptPassword(user.password ? user.password : '');
        await user.save()
        user.password = undefined
        responseSuccess(res, user, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const getByUserId = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) responseError(res, 'User not found', HttpStatus.NOT_FOUND)
        user ? user.password = undefined : ''
        responseSuccess(res, user, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const getUsersByType = PaginationDataType(User)

export const getUsers = PaginationData(User)

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = await User.findById(req.params.userId)
        if (!userId) responseError(res, 'User not found', HttpStatus.NOT_FOUND)
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            individual_registration: req.body.individual_registration,
            age: req.body.age,
            date_of_birth: req.body.date_of_birth,
            type: req.body.type,
            phone: req.body.phone,
            gender: req.body.gender,
            contract_start: req.body.contract_start,
            contract_end: req.body.contract_end,
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
        responseSuccess(res, user, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId)
        if (!user) responseError(res, 'User not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, 'User successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

