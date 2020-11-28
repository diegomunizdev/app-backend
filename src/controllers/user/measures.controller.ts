import { Request, Response } from 'express'
import Measures, { IMeasures } from '../../models/user.data/measures.model'
import { responseError, responseSuccess } from '../../middlewares/response'
import { ValidateMeasure } from '../../models/validators/measures.validator'
import { PaginationData } from '../pagination/pagination.controller'
import { HttpStatus } from '../../middlewares/http.status'

export const createMeasure = async (req: Request, res: Response) => {
    try {
        const measure: IMeasures = new Measures(req.body)
        if (!measure) responseError(res, 'Measure not created', HttpStatus.BAD_REQUEST)
        ValidateMeasure.validate(measure)
        await measure.save()
        responseSuccess(res, measure, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const getMeasures = PaginationData(Measures)

export const getByMeasureId = async (req: Request, res: Response) => {
    try {
        const measure = await Measures.findById(req.params.measureId)
        if (!measure) responseError(res, 'Measure not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, measure, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const updateMeasure = async (req: Request, res: Response) => {
    try {
        const { measureId } = req.params
        if (!measureId) responseError(res, 'Measure not found', HttpStatus.NOT_FOUND)
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
            left_calf: req.body.left_calf,
            next_review: req.body.next_review
        }
        await Measures.findByIdAndUpdate(measureId, {
            $set: measure
        }, { new: true })
        responseSuccess(res, measure, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const deleteMeasure = async (req: Request, res: Response) => {
    try {
        const { measureId } = req.params
        if (!measureId) responseError(res, 'Measure not found', HttpStatus.NOT_FOUND)
        await Measures.findByIdAndRemove(measureId)
        responseSuccess(res, 'Measure successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}