import { Request, Response } from 'express';
import { Error } from 'mongoose';

import { IAnamnesis } from '../../models/interfaces/anamnesis.interface';
import Anamnesis from '../../models/user.data/anamnesis.model';
import { ValidateAnamnesis } from '../../models/validators/anamnesis.validator';

export const createAnamnesis = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const anamnesis: IAnamnesis = new Anamnesis(req.body);
        if (!anamnesis) throw new Error(err.message);
        ValidateAnamnesis.validate(anamnesis);
        await anamnesis.save();
        res.status(201).json(anamnesis);
    } catch (error) {
        throw new Error(error.message || err.message);
    }
}

export const getByAnamnesisId = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const anamnesis = await Anamnesis.findById(req.params.anamnesisId);
        if (!anamnesis) throw new Error(err.message);
        res.status(200).json(anamnesis);
    } catch (error) {
        throw new Error(error.message || err.message);
    }
}

export const updateAnamnesis = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const anamnesisId = await Anamnesis.findById(req.params.anamnesisId);
        if (!anamnesisId) throw new Error(err.message);
        const anamnesis = req.body;
        await Anamnesis.findByIdAndUpdate(anamnesisId, {
            $set: anamnesis
        }, { new: true });
        res.status(200).json(anamnesis);
    } catch (error) {
        throw new Error(error.message || err.message);
    }
}

export const deleteAnamnesis = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const anamnesisId = req.params.anamnesisId;
        if (!anamnesisId) throw new Error(err.message);
        await Anamnesis.findByIdAndRemove(anamnesisId);
        res.status(200);
    } catch (error) {
        throw new Error(error.message || err.message);
    }
}