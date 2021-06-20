import { Request, Response } from 'express'
import { Error } from 'mongoose'
import Measures from '../../models/user.data/measures.model'
import { IMeasures } from '../../models/interfaces/measures.interface'
import { ValidateMeasure } from '../../models/validators/measures.validator'

export const createMeasure = async (err: Error, req: Request, res: Response) => {
    try {
        const measure: IMeasures = new Measures(req.body)
        if (!measure) throw new Error(err.message)
        ValidateMeasure.validate(measure)
        const result = await measure.save()
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const getByMeasureId = async (err: Error, req: Request, res: Response) => {
    try {
        const measure = await Measures.findById(req.params.measureId)
        if (!measure) throw new Error(err.message)
        res.status(200).json(measure)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const updateMeasure = async (err: Error, req: Request, res: Response) => {
    try {
        const { measureId } = req.params
        if (!measureId) throw new Error(err.message)
        const measure = req.body
        const result = await Measures.findByIdAndUpdate(measureId, {
            $set: measure
        }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const deleteMeasure = async (err: Error, req: Request, res: Response) => {
    try {
        const { measureId } = req.params
        const result = await Measures.findByIdAndRemove(measureId)
        if (!result) throw new Error(err.message)
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}