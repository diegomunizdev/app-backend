import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createClient = async (req: Request, res: Response) => {
    try {
        const user: IUser = new User(req.body);
        user.password = await user.encryptPassword(user.password);

        const saveUser = await user.save();
        // token
        const token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : undefined
        const token: string = jwt.sign({ _id: saveUser._id }, token_secret || 'tokentest');

        res.header('access-token', [token, user.type]).json(saveUser);
    } catch (error) {
        res.json(error)
    }
}

export const getClient = async (req: Request, res: Response) => {
    try {
        const client = await User.findById(req.params.clientId)
        if (!client) return res.status(404).json('Cliente não encontrado!')
        res.status(200).json(client)
    } catch (error) {
        res.json(error)
    }
}

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await User.find()
        if (!customers) return res.status(404).json('Clientes não encontrados!')
        res.status(200).json(customers)
    } catch (error) {
        res.json(error)
    }
}

export const updateClient = async (req: Request, res: Response) => {
    try {
        const { clientId } = req.params
        if (clientId !== undefined) {
            const client = {
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
            client.password = await client.encryptPassword(client.password);
            await User.findByIdAndUpdate(clientId, {
                $set: client
            }, { new: true })
            res.status(200).json('Atualizado com sucesso!')
        } else {
            res.json('Usuário não atualizado!')
        }
    } catch (error) {
        res.json(error)
    }
}

export const deleteClient = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndRemove(req.params.clientId)
        res.status(200).json({
            status: 'Cliente removido com sucesso!'
        })
    } catch (error) {
        res.json(error)
    }
}

