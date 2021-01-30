import { Request, Response } from 'express'
import { Error } from 'mongoose'
import Address, { IAddress } from '../../models/user.data/address.model'
import { ValidateAddress } from '../../models/validators/address.validator'

export const createAddress = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const address: IAddress = new Address(req.body)
        if (!address) throw new Error(err.message)
        ValidateAddress.validate(address)
        await address.save()
        res.status(201).json(address)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const getAddress = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const address = await Address.findOne({ user_id: req.params.userId })
        if (!address) throw new Error(err.message)
        res.status(200).json(address)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const updateAddress = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const addr = await Address.findOne({ user_id: req.params.userId })
        if (!addr) throw new Error(err.message)
        const address = req.body
        await Address.findByIdAndUpdate(addr ? addr.id : null, {
            $set: address
        }, { new: true })
        res.status(200).json(address)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const deleteAddress = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const addr = await Address.findOne({ user_id: req.params.userId })
        if (!addr) throw new Error(err.message)
        const deleteAddress = await Address.findByIdAndRemove(addr ? addr.id : '')
        if (!deleteAddress) throw new Error(err.message)
        res.status(200)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}