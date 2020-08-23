import { Request, Response } from 'express'
import Measures, { IMeasures } from '../models/user.data/measures.model'
import { PaginationData } from './pagination.controller'
import { responseError, responseSuccess } from '../middlewares/response'

export const createMeasure = async (req: Request, res: Response) => {
    try {
        const measure: IMeasures = new Measures(req.body)
        if (!measure) responseError(res, 'Measure not created', 400)
        await measure.save()
        responseSuccess(res, measure, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const getMeasures = PaginationData(Measures)

export const getByMeasureId = async (req: Request, res: Response) => {
    try {
        const measure = await Measures.findById(req.params.measureId)
        if (!measure) responseError(res, 'Measure not found', 404)
        responseSuccess(res, measure, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const updateMeasure = async (req: Request, res: Response) => {
    try {
        const { measureId } = req.params
        if (!measureId) responseError(res, 'Measure not found', 404)
        const measure = {
            weight: req.body.weight,
            height: req.body.height,
            chest: req.body.chest,
            waist: req.body.waist,
            upper_abdomen: req.body.upper_abdomen,
            lower_abdormen: req.body.lower_abdormen,
            hip: req.body.hip,
            right_arm: req.body.right_arm,
            left_arm: req.body.left_arm,
            before_right_arm: req.body.before_right_arm,
            before_left_arm: req.body.before_left_arm,
            upper_right_thigh: req.body.upper_right_thigh,
            upper_left_thigh: req.body.upper_left_thigh,
            medium_right_thigh: req.body.medium_right_thigh,
            middle_left_thigh: req.body.middle_left_thigh,
            right_calf: req.body.right_calf,
            left_calf: req.body.left_calf
        }
        await Measures.findByIdAndUpdate(measureId, {
            $set: measure
        }, { new: true })
        responseSuccess(res, measure, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const deleteMeasure = async (req: Request, res: Response) => {
    try {
        const measureId = req.params.measureId
        if (!measureId) responseError(res, 'Measure not found', 404)
        await Measures.findByIdAndRemove(measureId)
        responseSuccess(res, 'Measure successfully removed', 200)
    } catch (error) {
        responseError(res, error)
    }
}