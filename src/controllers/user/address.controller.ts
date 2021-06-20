import { Request, Response } from 'express';
import { Error } from 'mongoose';

import { IAddress } from '../../models/interfaces/address.interface';
import Address from '../../models/user.data/address.model';
import { ValidateAddress } from '../../models/validators/address.validator';
import { HttpMessage } from '../errors/errors';

export const createAddress = async (req: Request, res: Response): Promise<any> => {
    try {
        const address: IAddress = new Address(req.body);
        if (!address) throw new Error(HttpMessage.BAD_REQUEST);
        ValidateAddress.validate(address);
        await address.save();
        res.status(201).json(address);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAddress = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.params.id) throw new Error(HttpMessage.BAD_REQUEST);
        const address = await Address.findOne({ userId: req.params.id });
        if (!address) throw new Error(HttpMessage.NOT_FOUND);
        res.status(200).json(address);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateAddress = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const addr = await Address.findOne({ user_id: req.params.userId });
        if (!addr) throw new Error(err.message);
        const address = req.body;
        await Address.findByIdAndUpdate(addr ? addr.id : null, {
            $set: address
        }, { new: true });
        res.status(200).json(address);;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteAddress = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const addr = await Address.findOne({ user_id: req.params.userId });
        if (!addr) throw new Error(err.message);
        const deleteAddress = await Address.findByIdAndRemove(addr ? addr.id : '');
        if (!deleteAddress) throw new Error(err.message);
        res.status(200);
    } catch (error) {
        throw new Error(error.message);
    }
}