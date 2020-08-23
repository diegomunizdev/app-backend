import { Request, Response } from 'express'
import Evaluation, { IEvaluation } from '../models/evaluation.model'
import { responseError, responseSuccess } from '../middlewares/response'
import { PaginationData } from './pagination.controller'

export const createEvaluation = async (req: Request, res: Response) => {
    try {
        const evaluation: IEvaluation = new Evaluation(req.body)
        if (!evaluation) return responseError(res, 'Unable to save evaluation', 400)
        await evaluation.save()
        responseSuccess(res, evaluation, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const getEvaluation = PaginationData(Evaluation)

export const getEvaluationById = async (req: Request, res: Response) => {
    try {
        const evaluation = await Evaluation.findOne({ id: req.params.evaluationId })
        if (!evaluation) return responseError(res, 'Evaluation not found', 400)
        responseSuccess(res, evaluation, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const updateEvaluation = async (req: Request, res: Response) => {
    try {
        const evaluationId = Evaluation.findById({ id: req.params.evaluationId })
        if (!evaluationId) return responseError(res, 'Evaluation not found', 400)
        const evaluation = {
            note: req.body.note,
            title: req.body.title,
            description: req.body.description
        }

        await Evaluation.findByIdAndUpdate(evaluationId, {
            $set: evaluation
        }, { new: true })
        responseSuccess(res, evaluation, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const deleteEvaluation = async (req: Request, res: Response) => {
    try {
        const evaluationId = await Evaluation.findById({ id: req.params.evaluationId })
        if (!evaluationId) return responseError(res, 'Evaluation not found', 400)

        const deleteEvaluation = await Evaluation.findByIdAndRemove(evaluationId)
        if (!deleteEvaluation) return responseError(res, 'Has not been removed', 400)
        responseSuccess(res, 'Evaluation successfully removed', 200)
    } catch (error) {
        responseError(res, error)
    }
}
