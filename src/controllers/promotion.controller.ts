import { Request, Response } from 'express'
import Promotions, { IPromotions } from '../models/promotions.model'
import { responseError, responseSuccess } from '../middlewares/response'
import { ValidatePromotion } from '../models/validators/promotion.validator'
import { PaginationData } from './pagination/pagination.controller'
import { HttpStatus } from '../middlewares/http.status'

export const createPromotion = async (req: Request, res: Response) => {
    try {
        const promotion: IPromotions = new Promotions(req.body)
        if (!promotion) responseError(res, 'Promotion could not be created', HttpStatus.BAD_REQUEST)
        ValidatePromotion.validate(promotion)
        await promotion.save()
        responseSuccess(res, promotion, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error)
    }
}


export const getByPromotionId = async (req: Request, res: Response) => {
    try {
        const promotion = await Promotions.findById(req.params.promotionId)
        if (!promotion) responseError(res, 'Promotion not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, promotion, HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}

export const getPromotions = PaginationData(Promotions)

export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const { promotionId } = req.params
        if (!promotionId) responseError(res, 'Promotion not found', HttpStatus.NOT_FOUND)
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
        responseSuccess(res, promotion, HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}


export const deletePromotion = async (req: Request, res: Response) => {
    try {
        const promotionId = req.params.promotionId
        if (!promotionId) responseError(res, 'Promotion not found', HttpStatus.NOT_FOUND)
        await Promotions.findByIdAndRemove(promotionId)
        responseSuccess(res, 'Promotion successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}