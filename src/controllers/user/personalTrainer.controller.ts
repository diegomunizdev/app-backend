import { Request, Response } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';

import { ValidateUser } from '../../models/validators/user.validator';
import { IPersonalTrainer } from '../../models/interfaces/personalTrainer.interface';
import PersonalTrainer from '../../models/user.data/personalTrainer.model';
import Client from '../../models/user.data/client.model';
import { HttpStatusCode } from 'controllers/errors/errors';

export const createPersonalTrainer = async (err: Error, req: Request, res: Response) => {
    try {
        const personal: IPersonalTrainer = new PersonalTrainer(req.body);
        if (!personal) throw new Error(err.message);
        await ValidateUser.validate(personal);
        personal.password = await personal.encryptPassword(personal.password || '');
        await personal.save();
        personal ? personal.password = undefined : null;
        res.json(HttpStatusCode.CREATED).json(personal);
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getById = async (err: Error, req: Request, res: Response) => {
    try {
        const personal = await PersonalTrainer.findById(req.params.id);
        if (!personal) throw new Error(err.message);
        personal ? personal.password = undefined : null;

        const totalClients: any = Client.countDocuments();

        res.status(HttpStatusCode.OK).json({ ...personal, totalClients });
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updatePersonalTrainer = async (err: Error, req: Request, res: Response) => {
    try {
        const personal = await PersonalTrainer.findById(req.params.userId);
        if (!personal) throw new Error(err.message);
        const user = {
            ...req.body,
            encryptPassword: async (password: string): Promise<string> => {
                password = req.body.password;
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt);
            }
        }
        user.password = await user.encryptPassword(user.password || '')
        await ValidateUser.validate(user);
        await PersonalTrainer.findByIdAndUpdate(personal, {
            $set: user
        }, { new: true });
        user ? user.password = undefined : null;
        res.status(HttpStatusCode.OK).json(user);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deletePersonalTrainer = async (err: Error, req: Request, res: Response) => {
    try {
        const personal = await PersonalTrainer.findByIdAndRemove(req.params.userId);
        if (!personal) throw new Error(err.message);
        res.status(HttpStatusCode.OK).json(personal);
    } catch (error) {
        throw new Error(error.message);
    }
}