import { Request, Response } from 'express'
import Address, { IAddress } from '../models/user.data/address.model'

export const createAddress = async (req: Request, res: Response) => {
    try {
        const address: IAddress = new Address(req.body)
        if (!address) return res.status(400).json({
            status: 'Failure',
            error: 'Unable to save address'
        })
        await address.save()
        res.status(200).json({ status: 'Success', data: address })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const getAddress = async (req: Request, res: Response) => {
    try {
        const userId = await Address.findById(req.params.userId)
        if (!userId) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. Address not found'
        })
        res.status(200).json({ status: 'Success', data: userId })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const updateAddress = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const addr = await Address.findOne({ user_id: userId })
        if (!addr) res.status(404).json({
            status: 'Failure',
            error: 'Failed. Address not found'
        })
        const address = {
            zip_code: req.body.zip_code,
            name: req.body.name,
            complement: req.body.complement,
            number: req.body.number,
            neighborhood: req.body.neighborhood,
            city: req.body.city
        }
        await Address.findByIdAndUpdate(addr ? addr.id : '', {
            $set: address
        }, { new: true })
        res.status(200).json({ status: 'Success', data: address })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const addr = await Address.findOne({ user_id: userId })
        if (!addr) res.status(404).json({
            status: 'Failure',
            error: 'Failed. Address not found'
        })

        await Address.findByIdAndRemove(addr ? addr.id : '')
        res.status(200).json({
            status: 'Success',
            message: 'Address successfully removed'
        })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}