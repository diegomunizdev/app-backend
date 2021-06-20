import { Request, Response } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';

import { ValidateUser } from '../../models/validators/user.validator';
import Client from '../../models/user.data/client.model';
import { IClient } from '../../models/interfaces/client.interface';
import { HttpStatusCode } from '../errors/errors';

export const createClient = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const client: IClient = new Client(req.body);
        if (!client) throw new Error(err.message);
        client.password = await client.encryptPassword(client.password || '');
        const result: IClient = await client.save();
        result.password = undefined;
        res.status(HttpStatusCode.CREATED).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAllClient = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const page = parseInt(String(req.query.page), 10);
        const limit = parseInt(String(req.query.limit), 10);
        const index = (page - 1) * limit;
        const clients: IClient[] = await Client.find()
            .limit(limit)
            .skip(index);
        if (!clients) throw new Error(err.message);
        const totalClients: number = await Client.countDocuments().exec();
        res.status(HttpStatusCode.OK).header('x-total-count', String(totalClients)).json(clients);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getByClientId = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const client = await Client.findById(req.params.userId);
        if (!client) throw new Error(err.message);
        client ? client.password = undefined : null;
        res.status(HttpStatusCode.OK).json(client);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateClient = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const client = await Client.findById(req.params.userId);
        if (!client) throw new Error(err.message);
        const user = {
            ...req.body,
            encryptPassword: async (password: string): Promise<string> => {
                password = req.body.password;
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt);
            }
        }
        user.password = await user.encryptPassword(user.password || '');
        await ValidateUser.validate(user);
        await Client.findByIdAndUpdate(client, {
            $set: user
        }, { new: true });
        user ? user.password = undefined : null;
        res.status(HttpStatusCode.OK).json(user);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteClient = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const client = await Client.findByIdAndRemove(req.params.id);
        if (!client) throw new Error(err.message);
        res.status(HttpStatusCode.OK).json(client);
    } catch (error) {
        throw new Error(error.message);
    }
}