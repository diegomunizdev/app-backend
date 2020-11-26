import { Request, response, Response } from 'express'
import Payment, { IPayment } from '../../models/user.data/payment.model'
import { responseError, responseSuccess } from '../../middlewares/response'
import { ValidatePayment } from '../../models/validators/payment.validator'
import { HttpStatus } from '../../middlewares/http.status'

export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const payment: IPayment = new Payment(req.body)
        if (!payment) responseError(res, 'Data not added', HttpStatus.BAD_REQUEST)
        ValidatePayment.validate(payment)
        await payment.save()
        responseSuccess(res, payment, HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}

export const getPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await Payment.findById(req.params.userId)
        if (!user) responseError(res, 'Payment not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, user, HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}

export const updatePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { paymentId } = req.params
        if (!paymentId) responseError(res, 'Payment not found', HttpStatus.NOT_FOUND)
        const payment = {
            value: req.body.value
        }

        await Payment.findByIdAndUpdate(paymentId, {
            $set: payment
        }, { new: true })

        responseSuccess(res, payment, HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}

export const deletePayment = async (req: Request, res: Response) => {
    try {
        const { paymentId } = req.params
        if (!paymentId) responseError(res, 'Payment not found', HttpStatus.NOT_FOUND)
        await Payment.findByIdAndRemove(paymentId)
        responseSuccess(res, 'Payment successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}