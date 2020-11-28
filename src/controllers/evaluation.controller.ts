import { Request, Response } from 'express'
import Evaluation, { IEvaluation } from '../models/evaluation.model'
import { responseError, responseSuccess } from '../middlewares/response'
import { ValidateEvaluation } from '../models/validators/evaluation.validator'
import { PaginationData } from './pagination/pagination.controller'
import { HttpStatus } from '../middlewares/http.status'


export const createEvaluation = async (req: Request, res: Response) => {
    try {
        const evaluation: IEvaluation = new Evaluation(req.body)
        if (!evaluation) return responseError(res, 'Unable to save evaluation', HttpStatus.BAD_REQUEST)
        ValidateEvaluation.validate(evaluation)
        await evaluation.save()
        responseSuccess(res, evaluation, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const getEvaluation = PaginationData(Evaluation)

export const getEvaluationById = async (req: Request, res: Response) => {
    try {
        const evaluation = await Evaluation.findOne({ id: req.params.evaluationId })
        if (!evaluation) return responseError(res, 'Evaluation not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, evaluation, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const updateEvaluation = async (req: Request, res: Response) => {
    try {
        const evaluationId = Evaluation.findById({ id: req.params.evaluationId })
        if (!evaluationId) return responseError(res, 'Evaluation not found', HttpStatus.NOT_FOUND)
        const evaluation = {
            note: req.body.note,
            title: req.body.title,
            description: req.body.description
        }
        ValidateEvaluation.validate(evaluation)
        await Evaluation.findByIdAndUpdate(evaluationId, {
            $set: evaluation
        }, { new: true })
        responseSuccess(res, evaluation, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const deleteEvaluation = async (req: Request, res: Response) => {
    try {
        const evaluationId = await Evaluation.findById({ id: req.params.evaluationId })
        if (!evaluationId) return responseError(res, 'Evaluation not found', HttpStatus.NOT_FOUND)

        const deleteEvaluation = await Evaluation.findByIdAndRemove(evaluationId)
        if (!deleteEvaluation) return responseError(res, 'Has not been removed', HttpStatus.BAD_REQUEST)
        responseSuccess(res, 'Evaluation successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
