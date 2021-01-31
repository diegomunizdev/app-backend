import { Request, Response } from 'express'
import { Error } from 'mongoose'
import Payment, { IPayment } from '../../models/user.data/payment.model'
import { ValidatePayment } from '../../models/validators/payment.validator'

export const createPayment = async (err: Error, req: Request, res: Response): Promise<void> => {
    try {
        const payment: IPayment = new Payment(req.body)
        if (!payment) throw new Error(err.message)
        ValidatePayment.validate(payment)
        const result = await payment.save()
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const getPayment = async (err: Error, req: Request, res: Response): Promise<void> => {
    try {
        const user = await Payment.findById(req.params.userId)
        if (!user) throw new Error(err.message)
        res.status(200).json(user)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const updatePayment = async (err: Error, req: Request, res: Response): Promise<void> => {
    try {
        const { paymentId } = req.params
        if (!paymentId) throw new Error(err.message)
        const payment = req.body
        const result = await Payment.findByIdAndUpdate(paymentId, {
            $set: payment
        }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const deletePayment = async (err: Error, req: Request, res: Response) => {
    try {
        const { paymentId } = req.params
        if (!paymentId) throw new Error(err.message)
        const result = await Payment.findByIdAndRemove(paymentId)
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}