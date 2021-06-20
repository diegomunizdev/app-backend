import { Request, Response } from 'express';

import { IPromotions } from '../models/interfaces/promotions.interface';
import Promotions from '../models/promotions.model';
import { ValidatePromotion } from '../models/validators/promotion.validator';
import { HttpStatusCode } from './errors/errors';

export const createPromotion = async (err: Error, req: Request, res: Response) => {
    try {
        const promotion: IPromotions = new Promotions(req.body);
        if (!promotion) throw new Error(err.message);
        ValidatePromotion.validate(promotion);
        const result = await promotion.save();
        res.status(HttpStatusCode.CREATED).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getByPromotionId = async (err: Error, req: Request, res: Response) => {
    try {
        const promotion = await Promotions.findById(req.params.promotionId);
        if (!promotion) throw new Error(err.message);
        res.status(HttpStatusCode.OK).json(promotion);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updatePromotion = async (err: Error, req: Request, res: Response) => {
    try {
        const { promotionId } = req.params;
        if (!promotionId) throw new Error(err.message);
        const promotion = req.body;
        const result = await Promotions.findByIdAndUpdate(promotionId, {
            $set: promotion
        }, { new: true });
        res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
}


export const deletePromotion = async (err: Error, req: Request, res: Response) => {
    try {
        const promotionId = req.params.promotionId;
        if (!promotionId) throw new Error(err.message);
        await Promotions.findByIdAndRemove(promotionId);
        res.status(HttpStatusCode.OK);
    } catch (error) {
        throw new Error(error.message);
    }
}