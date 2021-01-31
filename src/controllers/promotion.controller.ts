import { Request, Response } from 'express'
import Promotions, { IPromotions } from '../models/promotions.model'
import { ValidatePromotion } from '../models/validators/promotion.validator'

export const createPromotion = async (err: Error, req: Request, res: Response) => {
    try {
        const promotion: IPromotions = new Promotions(req.body)
        if (!promotion) throw new Error(err.message)
        ValidatePromotion.validate(promotion)
        const result = await promotion.save()
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const getByPromotionId = async (err: Error, req: Request, res: Response) => {
    try {
        const promotion = await Promotions.findById(req.params.promotionId)
        if (!promotion) throw new Error(err.message)
        res.status(200).json(promotion)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const updatePromotion = async (err: Error, req: Request, res: Response) => {
    try {
        const { promotionId } = req.params
        if (!promotionId) throw new Error(err.message)
        const promotion = req.body
        const result = await Promotions.findByIdAndUpdate(promotionId, {
            $set: promotion
        }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}


export const deletePromotion = async (err: Error, req: Request, res: Response) => {
    try {
        const promotionId = req.params.promotionId
        if (!promotionId) throw new Error(err.message)
        await Promotions.findByIdAndRemove(promotionId)
        res.status(200)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}