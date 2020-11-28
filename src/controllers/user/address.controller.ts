import { Request, Response } from 'express'
import { responseError, responseSuccess } from '../../middlewares/response'
import Address, { IAddress } from '../../models/user.data/address.model'
import { ValidateAddress } from '../../models/validators/address.validator'

export const createAddress = async (req: Request, res: Response) => {
    try {
        const address: IAddress = new Address(req.body)
        if (!address) responseError(res, 'Unable to save address', 400)
        // TODO: Validando os dados de endereço
        ValidateAddress.validate(address)
        await address.save()
        responseSuccess(res, address, 201)
    } catch (error) {
        responseError(res, error)
    }
}

export const getAddress = async (req: Request, res: Response) => {
    try {
        const user = await Address.findOne({ user_id: req.params.userId })
        if (!user) return responseError(res, 'Address not found', 400)
        responseSuccess(res, user, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const updateAddress = async (req: Request, res: Response) => {
    try {
        const addr = await Address.findOne({ user_id: req.params.userId })
        if (!addr) responseError(res, 'Address not found', 400)
        const address = {
            zip_code: req.body.zip_code,
            name: req.body.name,
            complement: req.body.complement,
            number: req.body.number,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            uf: req.body.uf
        }

        await Address.findByIdAndUpdate(addr ? addr.id : '', {
            $set: address
        }, { new: true })
        responseSuccess(res, addr, 201)
    } catch (error) {
        responseError(res, error)
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const addr = await Address.findOne({ user_id: req.params.userId })
        if (!addr) responseError(res, 'Address not found', 400)
        const deleteAddress = await Address.findByIdAndRemove(addr ? addr.id : '')
        if (!deleteAddress) responseError(res, 'Has not been removed', 400)
        responseSuccess(res, 'Address successfully removed', 200)
    } catch (error) {
        responseError(res, error)
    }
}