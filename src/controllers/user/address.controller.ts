import { Request, Response } from 'express'
import { HttpStatus } from '../../middlewares/http.status'
import { responseError, responseSuccess } from '../../middlewares/response'
import Address, { IAddress } from '../../models/user.data/address.model'
import { ValidateAddress } from '../../models/validators/address.validator'

export const createAddress = async (req: Request, res: Response) => {
    try {
        const address: IAddress = new Address(req.body)
        if (!address) responseError(res, 'Unable to save address', HttpStatus.BAD_REQUEST)
        // TODO: Validando os dados de endereço
        ValidateAddress.validate(address)
        await address.save()
        responseSuccess(res, address, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const getAddress = async (req: Request, res: Response) => {
    try {
        const user = await Address.findOne({ user_id: req.params.userId })
        if (!user) return responseError(res, 'Address not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, user, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const updateAddress = async (req: Request, res: Response) => {
    try {
        const addr = await Address.findOne({ user_id: req.params.userId })
        if (!addr) responseError(res, 'Address not found', HttpStatus.NOT_FOUND)
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
        responseSuccess(res, addr, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const addr = await Address.findOne({ user_id: req.params.userId })
        if (!addr) responseError(res, 'Address not found', HttpStatus.NOT_FOUND)
        const deleteAddress = await Address.findByIdAndRemove(addr ? addr.id : '')
        if (!deleteAddress) responseError(res, 'Has not been removed', HttpStatus.BAD_REQUEST)
        responseSuccess(res, 'Address successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}