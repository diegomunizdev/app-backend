import { Request, Response } from 'express'
import Promotions, { IPromotions } from '../models/promotions'

export const createPromotion = async (req: Request, res: Response) => {
    try {
        const promotion: IPromotions = new Promotions(req.body)
        if (!promotion) return res.status(400).json({ error: 'Failed. Promotion could not be created' })
        await promotion.save()
        res.status(200).json({
            message: 'Promotion successfully created'
        })
    } catch (error) {
        res.json(error)
    }
}


export const getPromotion = async (req: Request, res: Response) => {
    try {
        const promotion = await Promotions.findById(req.params.promotionId)
        if (!promotion) return res.status(400).json({ error: 'Failed. Promotion not found' })
        res.status(200).json(promotion)
    } catch (error) {
        res.json(error)
    }
}


export const getPromotions = async (req: Request, res: Response) => {
    try {
        const promotions = await Promotions.find()
        if (!promotions) return res.status(400).json({
            error: 'Failed. Promotions were not found'
        })
        res.status(200).json(promotions)
    } catch (error) {
        res.json(error)
    }
}


export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const { promotionId } = req.params
        if (!promotionId) return res.status(400).json({
            error: 'Failed. Promotion not found'
        })
        const promotion = {
            name: req.body.name,
            value: req.body.value,
            date_start: req.body.date_start,
            date_end: req.body.date_end,
            user_id: req.body.user_id
        }
        await Promotions.findByIdAndUpdate(promotionId, {
            $set: promotion
        }, { new: true })
        res.status(200).json({
            message: 'Promotion update successfully'
        })
    } catch (error) {
        res.json(error)
    }
}


export const deletePromotion = async (req: Request, res: Response) => {
    try {
        const promotionId = req.params.promotionId
        if (!promotionId) return res.status(400).json({
            error: 'Failed. Promotion not found'
        })
        await Promotions.findByIdAndRemove(promotionId)
        res.status(200).json({
            message: 'Promotion successfully removed'
        })
    } catch (error) {
        res.json(error)
    }
}