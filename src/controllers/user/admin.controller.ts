import { Request, Response } from 'express'
import { Error } from 'mongoose'
import bcrypt from 'bcrypt'

import { IAdmin } from '../../models/interfaces/admin.interface'
import Admin from '../../models/user.data/admin.model'
import PersonalTrainer from '../../models/user.data/personalTrainer.model'
import Client from '../../models/user.data/client.model'
import { ErroMessage } from '../errors/errors'

export const createAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const admin: IAdmin = new Admin(req.body);
        if (!admin) throw new Error('')
        admin.password = await admin.encryptPassword(admin.password ? admin.password : '')
        const result: IAdmin = await admin.save()
        result.password = undefined
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAll = async (req: Request, res: Response): Promise<any> => {
    try {
        const page = Number(req.query.page)
        const limit = Number(req.query.limit)
        const index = (page - 1) * limit

        const admins: IAdmin[] = await Admin.find()
            .limit(limit)
            .skip(index)
        const totalAdmins: number = await Admin.countDocuments().exec()

        if (!admins) throw new Error(ErroMessage.USERS_NOT_FOUND)

        res.status(200).header('total-count', String(totalAdmins)).json(admins)
    } catch (error) {
        console.log(error)
    }
}

export const getById = async (req: Request, res: Response): Promise<any> => {
    try {
        const admin = await Admin.findById(req.params.id)
        if (!admin) throw new Error('')

        admin.password = undefined
        admin.totalAdmins = await Admin.countDocuments().exec()
        admin.totalPersonalsTrainer = await PersonalTrainer.countDocuments().exec()
        admin.totalClients = await Client.countDocuments().exec()

        res.status(200).json(admin)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.params.dia) throw new Error(ErroMessage.INVALID_PARAM)
        const admin = await Admin.findById(req.params.did)
        if (!admin) throw new Error(ErroMessage.INVALID_PARAM)
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dateBirth: req.body.dateBirth,
            phone: req.body.phone,
            encryptPassword: async (password: string): Promise<string> => {
                password = req.body.password
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt)
            }
        }
        user.password = await user.encryptPassword(user.password ? user.password : '')
        const result = await Admin.findByIdAndUpdate(admin, {
            $set: user
        }, { new: true })
        user ? user.password = undefined : null
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await Admin.findByIdAndRemove(req.params.userId)
        if (!result) throw new Error('')
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message)
    }
}