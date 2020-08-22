import { Request, Response } from 'express'
import Measures, { IMeasures } from '../models/user.data/measures.model'
import { PaginationData } from './pagination.controller'

export const createMeasure = async (req: Request, res: Response) => {
    try {
        const measure: IMeasures = new Measures(req.body)
        if (!measure) return res.status(400).json({
            status: 'Failure',
            error: 'Measure not created'
        })
        await measure.save()
        res.status(200).json({ status: 'Success', data: measure })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const getMeasures = PaginationData(Measures)

export const getByMeasureId = async (req: Request, res: Response) => {
    try {
        const measure = await Measures.findById(req.params.measureId)
        if (!measure) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. Measure not found'
        })
        res.status(200).json({ status: 'Success', data: measure })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const updateMeasure = async (req: Request, res: Response) => {
    try {
        const { measureId } = req.params
        if (!measureId) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. Measure not found'
        })
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
        res.status(200).json({ status: 'Success', data: measure })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}

export const deleteMeasure = async (req: Request, res: Response) => {
    try {
        const measureId = req.params.measureId
        if (!measureId) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. Measure not found'
        })
        await Measures.findByIdAndRemove(measureId)
        res.status(200).json({
            status: 'Success',
            message: 'Measure successfully removed'
        })
    } catch (error) {
        res.json({ status: 'Failure', error: error })
    }
}