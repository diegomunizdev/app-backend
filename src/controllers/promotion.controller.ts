import { Request, Response } from 'express'
import Promotions, { IPromotions } from '../models/promotions'

export const createPromotion = async (req: Request, res: Response) => {
    try {
        const promotion: IPromotions = new Promotions(req.body)
        if (!promotion) return res.status(400).json({
            status: 'Failure',
            error: 'Promotion could not be created'
        })
        await promotion.save()
        res.status(200).json({ status: 'Success', data: promotion })
    } catch (error) {
        res.status(400).json({ status: 'Failure', error: error })
    }
}


export const getByPromotionId = async (req: Request, res: Response) => {
    try {
        const promotion = await Promotions.findById(req.params.promotionId)
        if (!promotion) return res.status(400).json({
            status: 'Failure',
            error: 'Promotion not found'
        })
        res.status(200).json({ status: 'Success', data: promotion })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}


export const getPromotions = async (req: Request, res: Response) => {
    try {
        const promotions = await Promotions.find()
        if (!promotions) return res.status(400).json({
            status: 'Failure',
            error: 'Promotions were not found'
        })
        res.status(200).json({ status: 'Success', data: promotions })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}


export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const { promotionId } = req.params
        if (!promotionId) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. Promotion not found'
        })
        const promotion = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            value: req.body.value,
            date_start: req.body.date_start,
            date_end: req.body.date_end,
            user_id: req.body.user_id
        }
        await Promotions.findByIdAndUpdate(promotionId, {
            $set: promotion
        }, { new: true })
        res.status(200).json(promotion)
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